import { useState, useEffect } from "react";

interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

export function SpecialOfferBanner() {
  const [timeLeft, setTimeLeft] = useState<TimeLeft>({ days: 0, hours: 0, minutes: 0, seconds: 0 });

  useEffect(() => {
    const TIMER_KEY = 'pricing_special_offer_timer';
    const DURATION_MS = 72 * 60 * 60 * 1000; // 72 hours in milliseconds

    // Get or set the timer start time
    const getEndTime = () => {
      const stored = localStorage.getItem(TIMER_KEY);
      if (stored) {
        return parseInt(stored, 10);
      } else {
        const endTime = Date.now() + DURATION_MS;
        localStorage.setItem(TIMER_KEY, endTime.toString());
        return endTime;
      }
    };

    const updateTimer = () => {
      const endTime = getEndTime();
      const now = Date.now();
      const difference = endTime - now;

      if (difference <= 0) {
        // Timer expired, restart it
        const newEndTime = Date.now() + DURATION_MS;
        localStorage.setItem(TIMER_KEY, newEndTime.toString());
        const newDifference = newEndTime - Date.now();
        setTimeLeft(calculateTimeLeft(newDifference));
      } else {
        setTimeLeft(calculateTimeLeft(difference));
      }
    };

    const calculateTimeLeft = (difference: number): TimeLeft => {
      return {
        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        hours: Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
        minutes: Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60)),
        seconds: Math.floor((difference % (1000 * 60)) / 1000)
      };
    };

    // Initial calculation
    updateTimer();

    // Update every second
    const interval = setInterval(updateTimer, 1000);

    return () => clearInterval(interval);
  }, []);

  const formatNumber = (num: number) => num.toString().padStart(2, '0');

  return (
    <div className="flex justify-center mb-8">
      <div className="bg-yellow-400 rounded-full px-8 py-4 shadow-lg">
        <div className="text-center">
          <p className="text-black text-sm font-medium mb-2">Special offer available</p>
          <div className="flex items-center justify-center gap-2 text-black">
            <div className="text-center">
              <div className="text-2xl md:text-3xl font-bold" aria-live="polite">
                {formatNumber(timeLeft.days)}
              </div>
              <div className="text-xs font-medium">Days</div>
            </div>
            <div className="text-2xl md:text-3xl font-bold">:</div>
            <div className="text-center">
              <div className="text-2xl md:text-3xl font-bold" aria-live="polite">
                {formatNumber(timeLeft.hours)}
              </div>
              <div className="text-xs font-medium">Hours</div>
            </div>
            <div className="text-2xl md:text-3xl font-bold">:</div>
            <div className="text-center">
              <div className="text-2xl md:text-3xl font-bold" aria-live="polite">
                {formatNumber(timeLeft.minutes)}
              </div>
              <div className="text-xs font-medium">Minutes</div>
            </div>
            <div className="text-2xl md:text-3xl font-bold">:</div>
            <div className="text-center">
              <div className="text-2xl md:text-3xl font-bold" aria-live="polite">
                {formatNumber(timeLeft.seconds)}
              </div>
              <div className="text-xs font-medium">Seconds</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}