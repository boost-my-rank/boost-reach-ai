import { useState, useEffect, useRef } from "react";

interface TileState {
  value: number;
  nextTriggerAt: number;
  lastResetDate: string;
  showIncrement: boolean;
  // Special tracking for tile1's session-based increments
  initialSeenAt?: number;
  lastIncrementAt?: number;
  randomNextDueAt?: number;
  first5sDone?: boolean;
  first60sDone?: boolean;
  // Special tracking for tile2's first visit
  isFirstVisit?: boolean;
  canStartIncrementing?: boolean;
}

interface ClientTilesResult {
  tile1: TileState;
  tile2: TileState;
  tile3: TileState;
  enableTile2Incrementing: () => void;
}

const STORAGE_KEY = "dashboard_client_tiles";

// Tile configurations
const TILE_CONFIG = {
  tile1: { 
    resetValue: 5, 
    minInterval: 6 * 60 * 1000, // 6 minutes
    maxInterval: 8 * 60 * 1000  // 8 minutes
  },
  tile2: { 
    resetValue: 2, 
    minInterval: 36 * 60 * 1000, // 36 minutes
    maxInterval: 40 * 60 * 1000  // 40 minutes
  },
  tile3: { 
    resetValue: 1, 
    minInterval: 24 * 60 * 1000, // 24 minutes
    maxInterval: 30 * 60 * 1000  // 30 minutes
  }
};

function getRandomInterval(min: number, max: number): number {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function getTodayDateString(): string {
  return new Date().toLocaleDateString();
}

export function useClientTiles(): ClientTilesResult {
  const [tiles, setTiles] = useState<{
    tile1: TileState;
    tile2: TileState; 
    tile3: TileState;
  }>({
    tile1: { value: 5, nextTriggerAt: 0, lastResetDate: '', showIncrement: false },
    tile2: { value: 2, nextTriggerAt: 0, lastResetDate: '', showIncrement: false, isFirstVisit: false, canStartIncrementing: false },
    tile3: { value: 1, nextTriggerAt: 0, lastResetDate: '', showIncrement: false }
  });

  const timeoutsRef = useRef<{
    tile1_5s?: NodeJS.Timeout;
    tile1_60s?: NodeJS.Timeout;
    tile1_random?: NodeJS.Timeout;
    tile2?: NodeJS.Timeout;
    tile3?: NodeJS.Timeout;
  }>({});

  const hideTimeoutsRef = useRef<{
    tile1?: NodeJS.Timeout;
    tile2?: NodeJS.Timeout;
    tile3?: NodeJS.Timeout;
  }>({});

  useEffect(() => {
    const now = Date.now();
    const today = getTodayDateString();
    const storedData = localStorage.getItem(STORAGE_KEY);
    
    // Check if this is first ever visit for tile2
    const isFirstEverVisit = !localStorage.getItem('tile2.firstVisitDone');
    
    let initialState = { ...tiles };

    // Load or initialize state
    if (storedData) {
      try {
        const parsed = JSON.parse(storedData);
        initialState = {
          tile1: { 
            ...parsed.tile1, 
            showIncrement: false,
            first5sDone: false, // Reset session flags on each load
            first60sDone: false,
            initialSeenAt: parsed.tile1.initialSeenAt || now
          },
          tile2: { 
            ...parsed.tile2, 
            showIncrement: false,
            isFirstVisit: isFirstEverVisit,
            canStartIncrementing: parsed.tile2.canStartIncrementing || false
          },
          tile3: { ...parsed.tile3, showIncrement: false }
        };
      } catch (e) {
        console.error('Failed to parse stored tile data:', e);
      }
    } else {
      // If no stored data, set initial state
      initialState.tile1.initialSeenAt = now;
      initialState.tile2.isFirstVisit = isFirstEverVisit;
      initialState.tile2.value = isFirstEverVisit ? 0 : 2;
    }

    // Check if we need to reset for new day
    Object.keys(TILE_CONFIG).forEach((tileKey) => {
      const key = tileKey as keyof typeof TILE_CONFIG;
      const config = TILE_CONFIG[key];
      
      if (initialState[key].lastResetDate !== today) {
        // Reset for new day
        if (key === 'tile1') {
          initialState[key] = {
            value: config.resetValue,
            nextTriggerAt: 0,
            lastResetDate: today,
            showIncrement: false,
            initialSeenAt: now,
            first5sDone: false,
            first60sDone: false
          };
        } else if (key === 'tile2') {
          initialState[key] = {
            value: config.resetValue,
            nextTriggerAt: now + getRandomInterval(config.minInterval, config.maxInterval),
            lastResetDate: today,
            showIncrement: false,
            isFirstVisit: isFirstEverVisit,
            canStartIncrementing: false
          };
        } else {
          initialState[key] = {
            value: config.resetValue,
            nextTriggerAt: now + getRandomInterval(config.minInterval, config.maxInterval),
            lastResetDate: today,
            showIncrement: false
          };
        }
      }
    });

    // Handle tile1 catch-up logic
    if (initialState.tile1.randomNextDueAt && now >= initialState.tile1.randomNextDueAt) {
      // Catch up missed random increments
      let missedIncrements = 0;
      let nextDue = initialState.tile1.randomNextDueAt;
      
      while (now >= nextDue) {
        missedIncrements++;
        nextDue += getRandomInterval(TILE_CONFIG.tile1.minInterval, TILE_CONFIG.tile1.maxInterval);
      }
      
      if (missedIncrements > 0) {
        initialState.tile1.value += missedIncrements;
        initialState.tile1.randomNextDueAt = nextDue;
        initialState.tile1.lastIncrementAt = nextDue - getRandomInterval(TILE_CONFIG.tile1.minInterval, TILE_CONFIG.tile1.maxInterval);
        
        // Show animation for catch-up
        setTimeout(() => {
          setTiles(prev => ({
            ...prev,
            tile1: { ...prev.tile1, showIncrement: true }
          }));
          
          hideTimeoutsRef.current.tile1 = setTimeout(() => {
            setTiles(prev => ({
              ...prev,
              tile1: { ...prev.tile1, showIncrement: false }
            }));
          }, 5000);
        }, 100);
      }
    }

    // Handle catch-up for tiles 2 and 3
    ['tile2', 'tile3'].forEach((tileKey) => {
      const key = tileKey as keyof typeof TILE_CONFIG;
      const config = TILE_CONFIG[key];
      const tileState = initialState[key];
      
      // Skip tile2 if it's first visit and can't start incrementing yet
      if (key === 'tile2' && tileState.isFirstVisit && !tileState.canStartIncrementing) {
        return;
      }
      
      let missedIncrements = 0;
      let currentTrigger = tileState.nextTriggerAt;
      
      // Calculate missed increments
      while (now >= currentTrigger && currentTrigger > 0) {
        missedIncrements++;
        currentTrigger += getRandomInterval(config.minInterval, config.maxInterval);
      }
      
      if (missedIncrements > 0) {
        // Apply missed increments
        initialState[key].value += missedIncrements;
        initialState[key].nextTriggerAt = currentTrigger;
        
        // Show increment animation for the last missed increment
        setTimeout(() => {
          setTiles(prev => ({
            ...prev,
            [key]: { ...prev[key], showIncrement: true }
          }));
          
          hideTimeoutsRef.current[key] = setTimeout(() => {
            setTiles(prev => ({
              ...prev,
              [key]: { ...prev[key], showIncrement: false }
            }));
          }, 5000);
        }, 100);
      }
    });

    setTiles(initialState);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(initialState));

    // Schedule tile1 increments (5s and 60s)
    const performTile1Increment = (type: '5s' | '60s') => {
      setTiles(prev => {
        const newState = {
          ...prev,
          tile1: {
            ...prev.tile1,
            value: prev.tile1.value + 1,
            lastIncrementAt: Date.now(),
            showIncrement: true,
            ...(type === '5s' ? { first5sDone: true } : { first60sDone: true })
          }
        };
        localStorage.setItem(STORAGE_KEY, JSON.stringify(newState));
        return newState;
      });

      // Hide increment after 5 seconds
      hideTimeoutsRef.current.tile1 = setTimeout(() => {
        setTiles(prev => ({
          ...prev,
          tile1: { ...prev.tile1, showIncrement: false }
        }));
      }, 5000);

      // If this was the 60s increment, schedule first random increment
      if (type === '60s') {
        const nextRandomDelay = getRandomInterval(TILE_CONFIG.tile1.minInterval, TILE_CONFIG.tile1.maxInterval);
        const nextDue = Date.now() + nextRandomDelay;
        
        setTiles(prev => {
          const newState = {
            ...prev,
            tile1: {
              ...prev.tile1,
              randomNextDueAt: nextDue
            }
          };
          localStorage.setItem(STORAGE_KEY, JSON.stringify(newState));
          return newState;
        });
        
        timeoutsRef.current.tile1_random = setTimeout(() => {
          performTile1RandomIncrement();
        }, nextRandomDelay);
      }
    };

    const performTile1RandomIncrement = () => {
      const now = Date.now();
      setTiles(prev => {
        const nextRandomDelay = getRandomInterval(TILE_CONFIG.tile1.minInterval, TILE_CONFIG.tile1.maxInterval);
        const nextDue = now + nextRandomDelay;
        
        const newState = {
          ...prev,
          tile1: {
            ...prev.tile1,
            value: prev.tile1.value + 1,
            lastIncrementAt: now,
            randomNextDueAt: nextDue,
            showIncrement: true
          }
        };
        localStorage.setItem(STORAGE_KEY, JSON.stringify(newState));
        return newState;
      });

      // Hide increment after 5 seconds
      hideTimeoutsRef.current.tile1 = setTimeout(() => {
        setTiles(prev => ({
          ...prev,
          tile1: { ...prev.tile1, showIncrement: false }
        }));
      }, 5000);

      // Schedule next random increment
      const nextRandomDelay = getRandomInterval(TILE_CONFIG.tile1.minInterval, TILE_CONFIG.tile1.maxInterval);
      timeoutsRef.current.tile1_random = setTimeout(() => {
        performTile1RandomIncrement();
      }, nextRandomDelay);
    };

    // Schedule 5s increment
    timeoutsRef.current.tile1_5s = setTimeout(() => {
      performTile1Increment('5s');
    }, 5000);

    // Schedule 60s increment
    timeoutsRef.current.tile1_60s = setTimeout(() => {
      performTile1Increment('60s');
    }, 60000);

    // Resume random increments if they should be running
    if (initialState.tile1.randomNextDueAt && initialState.tile1.randomNextDueAt > now) {
      const timeToNext = initialState.tile1.randomNextDueAt - now;
      timeoutsRef.current.tile1_random = setTimeout(() => {
        performTile1RandomIncrement();
      }, timeToNext);
    }

    // Schedule increments for tiles 2 and 3
    const performIncrement = (tileKey: keyof typeof TILE_CONFIG) => {
      const config = TILE_CONFIG[tileKey];
      const nextTrigger = Date.now() + getRandomInterval(config.minInterval, config.maxInterval);
      
      setTiles(prev => {
        const newState = {
          ...prev,
          [tileKey]: {
            ...prev[tileKey],
            value: prev[tileKey].value + 1,
            nextTriggerAt: nextTrigger,
            showIncrement: true
          }
        };
        
        localStorage.setItem(STORAGE_KEY, JSON.stringify(newState));
        return newState;
      });

      // Hide increment after 5 seconds
      hideTimeoutsRef.current[tileKey] = setTimeout(() => {
        setTiles(prev => ({
          ...prev,
          [tileKey]: { ...prev[tileKey], showIncrement: false }
        }));
      }, 5000);

      // Schedule next increment
      timeoutsRef.current[tileKey] = setTimeout(() => {
        performIncrement(tileKey);
      }, getRandomInterval(config.minInterval, config.maxInterval));
    };

    // Schedule tile2 and tile3 increments
    ['tile2', 'tile3'].forEach((tileKey) => {
      const key = tileKey as keyof typeof TILE_CONFIG;
      const tileState = initialState[key];
      
      // Skip tile2 if it's first visit and can't start incrementing yet
      if (key === 'tile2' && tileState.isFirstVisit && !tileState.canStartIncrementing) {
        return;
      }
      
      const timeToNext = tileState.nextTriggerAt - now;
      
      if (timeToNext > 0) {
        timeoutsRef.current[key] = setTimeout(() => {
          performIncrement(key);
        }, timeToNext);
      } else if (tileState.nextTriggerAt > 0) {
        // Immediate increment if overdue
        performIncrement(key);
      }
    });

    // Schedule midnight reset
    const scheduleNextMidnightReset = () => {
      const tomorrow = new Date();
      tomorrow.setDate(tomorrow.getDate() + 1);
      tomorrow.setHours(0, 0, 0, 0);
      const timeToMidnight = tomorrow.getTime() - Date.now();
      
      setTimeout(() => {
        // Reset all tiles
        const newDate = getTodayDateString();
        const resetState = {
          tile1: { 
            value: TILE_CONFIG.tile1.resetValue, 
            nextTriggerAt: 0,
            lastResetDate: newDate, 
            showIncrement: false,
            initialSeenAt: Date.now(),
            first5sDone: false,
            first60sDone: false
          },
          tile2: { 
            value: TILE_CONFIG.tile2.resetValue, 
            nextTriggerAt: Date.now() + getRandomInterval(TILE_CONFIG.tile2.minInterval, TILE_CONFIG.tile2.maxInterval),
            lastResetDate: newDate, 
            showIncrement: false,
            isFirstVisit: false,
            canStartIncrementing: true
          },
          tile3: { 
            value: TILE_CONFIG.tile3.resetValue, 
            nextTriggerAt: Date.now() + getRandomInterval(TILE_CONFIG.tile3.minInterval, TILE_CONFIG.tile3.maxInterval),
            lastResetDate: newDate, 
            showIncrement: false 
          }
        };
        
        setTiles(resetState);
        localStorage.setItem(STORAGE_KEY, JSON.stringify(resetState));
        
        // Schedule next midnight reset
        scheduleNextMidnightReset();
      }, timeToMidnight);
    };

    scheduleNextMidnightReset();

    return () => {
      // Mark first visit as done when component unmounts
      if (initialState.tile2?.isFirstVisit) {
        localStorage.setItem('tile2.firstVisitDone', 'true');
      }
      
      // Clear all timeouts
      Object.values(timeoutsRef.current).forEach(timeout => {
        if (timeout) clearTimeout(timeout);
      });
      Object.values(hideTimeoutsRef.current).forEach(timeout => {
        if (timeout) clearTimeout(timeout);
      });
    };
  }, []);

  // Function to enable tile2 incrementing (called when user saves changes)
  const enableTile2Incrementing = () => {
    const performIncrementLocal = (tileKey: keyof typeof TILE_CONFIG) => {
      const config = TILE_CONFIG[tileKey];
      const nextTrigger = Date.now() + getRandomInterval(config.minInterval, config.maxInterval);
      
      setTiles(prev => {
        const newState = {
          ...prev,
          [tileKey]: {
            ...prev[tileKey],
            value: prev[tileKey].value + 1,
            nextTriggerAt: nextTrigger,
            showIncrement: true
          }
        };
        
        localStorage.setItem(STORAGE_KEY, JSON.stringify(newState));
        return newState;
      });

      // Hide increment after 5 seconds
      hideTimeoutsRef.current[tileKey] = setTimeout(() => {
        setTiles(prev => ({
          ...prev,
          [tileKey]: { ...prev[tileKey], showIncrement: false }
        }));
      }, 5000);

      // Schedule next increment
      timeoutsRef.current[tileKey] = setTimeout(() => {
        performIncrementLocal(tileKey);
      }, getRandomInterval(config.minInterval, config.maxInterval));
    };

    setTiles(prev => {
      const newState = {
        ...prev,
        tile2: {
          ...prev.tile2,
          canStartIncrementing: true,
          nextTriggerAt: Date.now() + getRandomInterval(TILE_CONFIG.tile2.minInterval, TILE_CONFIG.tile2.maxInterval)
        }
      };
      localStorage.setItem(STORAGE_KEY, JSON.stringify(newState));
      
      // Start incrementing schedule
      timeoutsRef.current.tile2 = setTimeout(() => {
        performIncrementLocal('tile2');
      }, getRandomInterval(TILE_CONFIG.tile2.minInterval, TILE_CONFIG.tile2.maxInterval));
      
      return newState;
    });
  };

  return { ...tiles, enableTile2Incrementing };
}