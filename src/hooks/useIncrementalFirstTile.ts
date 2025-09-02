import { useState, useEffect, useRef } from "react";

interface IncrementalState {
  value: number;
  lastIncrementAt: number;
  initialSeenAt: number;
}

interface IncrementalFirstTileResult {
  displayValue: number;
  showIncrement: boolean;
  isProcessing: boolean;
}

const STORAGE_KEY = "dashboard_first_tile_state";
const INITIAL_DELAY = 5000; // 5 seconds
const INCREMENT_INTERVAL = 60000; // 60 seconds

export function useIncrementalFirstTile(originalValue: number | undefined): IncrementalFirstTileResult {
  const [displayValue, setDisplayValue] = useState<number>(originalValue ?? 0);
  const [showIncrement, setShowIncrement] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const timeoutRef = useRef<NodeJS.Timeout>();
  const intervalRef = useRef<NodeJS.Timeout>();
  const catchUpRef = useRef<NodeJS.Timeout>();

  useEffect(() => {
    if (originalValue === undefined) return;

    const now = Date.now();
    const storedData = localStorage.getItem(STORAGE_KEY);
    let state: IncrementalState;

    if (storedData) {
      try {
        const parsed = JSON.parse(storedData);
        state = {
          value: parsed.value || originalValue,
          lastIncrementAt: parsed.lastIncrementAt || now,
          initialSeenAt: parsed.initialSeenAt || now
        };
      } catch {
        state = {
          value: originalValue,
          lastIncrementAt: now,
          initialSeenAt: now
        };
      }
    } else {
      state = {
        value: originalValue,
        lastIncrementAt: now,
        initialSeenAt: now
      };
    }

    // Calculate missed increments
    const timeFromInitial = now - state.initialSeenAt;
    const timeFromLastIncrement = now - state.lastIncrementAt;
    
    let missedIncrements = 0;
    let nextScheduledTime = state.initialSeenAt + INITIAL_DELAY;

    // Check if we've passed the initial 5s mark
    if (timeFromInitial >= INITIAL_DELAY) {
      // Calculate how many 60s intervals have passed since the 5s mark
      const timeSinceFirstIncrement = timeFromInitial - INITIAL_DELAY;
      const totalPossibleIncrements = Math.floor(timeSinceFirstIncrement / INCREMENT_INTERVAL) + 1;
      
      // Calculate how many increments we should have done vs what we have
      const timeSinceLastIncrement = now - state.lastIncrementAt;
      const incrementsSinceLastKnown = Math.floor((timeSinceLastIncrement - INITIAL_DELAY + (state.lastIncrementAt - state.initialSeenAt)) / INCREMENT_INTERVAL);
      
      if (incrementsSinceLastKnown > 0) {
        missedIncrements = incrementsSinceLastKnown;
        nextScheduledTime = state.lastIncrementAt + (incrementsSinceLastKnown * INCREMENT_INTERVAL);
      } else {
        // Calculate next scheduled time based on initial timing
        const intervalsPassed = Math.floor(timeSinceFirstIncrement / INCREMENT_INTERVAL);
        nextScheduledTime = state.initialSeenAt + INITIAL_DELAY + (intervalsPassed + 1) * INCREMENT_INTERVAL;
      }
    }

    // Apply missed increments with animation
    if (missedIncrements > 0) {
      setIsProcessing(true);
      let currentIncrement = 0;
      
      const applyCatchUpIncrement = () => {
        if (currentIncrement < missedIncrements) {
          setDisplayValue(prev => prev + 1);
          setShowIncrement(true);
          
          setTimeout(() => setShowIncrement(false), 800);
          
          currentIncrement++;
          state.value++;
          state.lastIncrementAt += INCREMENT_INTERVAL;
          
          // Save state after each increment
          localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
          
          if (currentIncrement < missedIncrements) {
            catchUpRef.current = setTimeout(applyCatchUpIncrement, 300);
          } else {
            setIsProcessing(false);
          }
        }
      };
      
      applyCatchUpIncrement();
    } else {
      setDisplayValue(state.value);
    }

    // Save initial state
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));

    // Schedule next increment
    const timeToNext = nextScheduledTime - now;
    
    if (timeToNext > 0) {
      timeoutRef.current = setTimeout(() => {
        performIncrement();
        
        // Set up regular interval for subsequent increments
        intervalRef.current = setInterval(performIncrement, INCREMENT_INTERVAL);
      }, timeToNext);
    } else {
      // Start regular interval immediately
      intervalRef.current = setInterval(performIncrement, INCREMENT_INTERVAL);
    }

    function performIncrement() {
      const currentTime = Date.now();
      const currentState = JSON.parse(localStorage.getItem(STORAGE_KEY) || '{}');
      
      // Prevent duplicate increments
      const timeSinceLastIncrement = currentTime - (currentState.lastIncrementAt || 0);
      if (timeSinceLastIncrement < INCREMENT_INTERVAL - 1000) {
        return; // Skip if too soon
      }
      
      setDisplayValue(prev => prev + 1);
      setShowIncrement(true);
      
      setTimeout(() => setShowIncrement(false), 800);
      
      // Update state
      const newState = {
        ...currentState,
        value: (currentState.value || originalValue) + 1,
        lastIncrementAt: currentTime
      };
      
      localStorage.setItem(STORAGE_KEY, JSON.stringify(newState));
    }

    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
      if (intervalRef.current) clearInterval(intervalRef.current);
      if (catchUpRef.current) clearTimeout(catchUpRef.current);
    };
  }, [originalValue]);

  return {
    displayValue,
    showIncrement,
    isProcessing
  };
}