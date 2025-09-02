import { useState, useEffect, useRef } from "react";

interface TileState {
  value: number;
  nextTriggerAt: number;
  lastResetDate: string;
  showIncrement: boolean;
  // Special tracking for tile1's initial increments
  firstIncrementDone?: boolean;
  secondIncrementDone?: boolean;
  sessionStartedAt?: number;
}

interface ClientTilesResult {
  tile1: TileState;
  tile2: TileState;
  tile3: TileState;
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

function getLocalMidnight(): Date {
  const midnight = new Date();
  midnight.setHours(0, 0, 0, 0);
  return midnight;
}

export function useClientTiles(): ClientTilesResult {
  const [tiles, setTiles] = useState<{
    tile1: TileState;
    tile2: TileState; 
    tile3: TileState;
  }>({
    tile1: { value: 5, nextTriggerAt: 0, lastResetDate: '', showIncrement: false, firstIncrementDone: false, secondIncrementDone: false, sessionStartedAt: Date.now() },
    tile2: { value: 2, nextTriggerAt: 0, lastResetDate: '', showIncrement: false },
    tile3: { value: 1, nextTriggerAt: 0, lastResetDate: '', showIncrement: false }
  });

  const timeoutsRef = useRef<{
    tile1?: NodeJS.Timeout;
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
    
    let initialState = { ...tiles };

    // Load or initialize state
    if (storedData) {
      try {
        const parsed = JSON.parse(storedData);
        initialState = {
          tile1: { 
            ...parsed.tile1, 
            showIncrement: false,
            firstIncrementDone: parsed.tile1.firstIncrementDone || false,
            secondIncrementDone: parsed.tile1.secondIncrementDone || false,
            sessionStartedAt: parsed.tile1.sessionStartedAt || now
          },
          tile2: { ...parsed.tile2, showIncrement: false },
          tile3: { ...parsed.tile3, showIncrement: false }
        };
      } catch (e) {
        console.error('Failed to parse stored tile data:', e);
      }
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
            nextTriggerAt: 0, // Will be set by special logic
            lastResetDate: today,
            showIncrement: false,
            firstIncrementDone: false,
            secondIncrementDone: false,
            sessionStartedAt: now
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

    // Special handling for tile1 if it's a new session or missing session data
    if (!initialState.tile1.sessionStartedAt || initialState.tile1.lastResetDate !== today) {
      initialState.tile1.sessionStartedAt = now;
      initialState.tile1.firstIncrementDone = false;
      initialState.tile1.secondIncrementDone = false;
    }

    // Handle catch-up for missed increments and special tile1 logic
    const sessionStart = initialState.tile1.sessionStartedAt || now;
    const timeFromSessionStart = now - sessionStart;
    
    // Special handling for tile1's first two increments
    if (!initialState.tile1.firstIncrementDone && timeFromSessionStart >= 5000) {
      // First increment should have happened
      initialState.tile1.value += 1;
      initialState.tile1.firstIncrementDone = true;
      
      // Show animation
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
    
    if (!initialState.tile1.secondIncrementDone && timeFromSessionStart >= 60000) {
      // Second increment should have happened
      initialState.tile1.value += 1;
      initialState.tile1.secondIncrementDone = true;
      
      // Show animation
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
      }, 200);
    }

    // Handle catch-up for tiles 2 and 3 (regular random intervals)
    ['tile2', 'tile3'].forEach((tileKey) => {
      const key = tileKey as keyof typeof TILE_CONFIG;
      const config = TILE_CONFIG[key];
      const tileState = initialState[key];
      
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

    // Schedule next increments with special logic for tile1
    const scheduleIncrement = (tileKey: keyof typeof TILE_CONFIG) => {
      if (tileKey === 'tile1') {
        const sessionStart = initialState.tile1.sessionStartedAt || now;
        const timeFromSessionStart = now - sessionStart;
        
        // Schedule first increment (5 seconds)
        if (!initialState.tile1.firstIncrementDone) {
          const timeToFirst = Math.max(0, 5000 - timeFromSessionStart);
          timeoutsRef.current.tile1 = setTimeout(() => {
            performTile1FirstIncrement();
          }, timeToFirst);
          return;
        }
        
        // Schedule second increment (1 minute)
        if (!initialState.tile1.secondIncrementDone) {
          const timeToSecond = Math.max(0, 60000 - timeFromSessionStart);
          timeoutsRef.current.tile1 = setTimeout(() => {
            performTile1SecondIncrement();
          }, timeToSecond);
          return;
        }
        
        // Both special increments done, now use random intervals
        const config = TILE_CONFIG.tile1;
        const nextRandomDelay = getRandomInterval(config.minInterval, config.maxInterval);
        timeoutsRef.current.tile1 = setTimeout(() => {
          performIncrement('tile1');
        }, nextRandomDelay);
      } else {
        // Regular scheduling for tiles 2 and 3
        const config = TILE_CONFIG[tileKey];
        const tileState = initialState[tileKey];
        const timeToNext = tileState.nextTriggerAt - now;
        
        if (timeToNext > 0) {
          timeoutsRef.current[tileKey] = setTimeout(() => {
            performIncrement(tileKey);
          }, timeToNext);
        } else if (tileState.nextTriggerAt > 0) {
          // Immediate increment if overdue
          performIncrement(tileKey);
        }
      }
    };

    const performTile1FirstIncrement = () => {
      setTiles(prev => {
        const newState = {
          ...prev,
          tile1: {
            ...prev.tile1,
            value: prev.tile1.value + 1,
            firstIncrementDone: true,
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

      // Schedule second increment (55 seconds later, for total of 1 minute)
      timeoutsRef.current.tile1 = setTimeout(() => {
        performTile1SecondIncrement();
      }, 55000);
    };

    const performTile1SecondIncrement = () => {
      setTiles(prev => {
        const newState = {
          ...prev,
          tile1: {
            ...prev.tile1,
            value: prev.tile1.value + 1,
            secondIncrementDone: true,
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

      // Now start random 6-8 minute intervals
      const config = TILE_CONFIG.tile1;
      const nextRandomDelay = getRandomInterval(config.minInterval, config.maxInterval);
      timeoutsRef.current.tile1 = setTimeout(() => {
        performIncrement('tile1');
      }, nextRandomDelay);
    };

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
        
        // Save to localStorage
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

    // Schedule increments for all tiles
    scheduleIncrement('tile1');
    scheduleIncrement('tile2');
    scheduleIncrement('tile3');

    // Check for midnight reset
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
            firstIncrementDone: false,
            secondIncrementDone: false,
            sessionStartedAt: Date.now()
          },
          tile2: { 
            value: TILE_CONFIG.tile2.resetValue, 
            nextTriggerAt: Date.now() + getRandomInterval(TILE_CONFIG.tile2.minInterval, TILE_CONFIG.tile2.maxInterval),
            lastResetDate: newDate, 
            showIncrement: false 
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
        
        // Reschedule increments
        scheduleIncrement('tile1');
        scheduleIncrement('tile2');
        scheduleIncrement('tile3');
        
        // Schedule next midnight reset
        scheduleNextMidnightReset();
      }, timeToMidnight);
    };

    scheduleNextMidnightReset();

    return () => {
      // Clear all timeouts
      Object.values(timeoutsRef.current).forEach(timeout => {
        if (timeout) clearTimeout(timeout);
      });
      Object.values(hideTimeoutsRef.current).forEach(timeout => {
        if (timeout) clearTimeout(timeout);
      });
    };
  }, []);

  return tiles;
}