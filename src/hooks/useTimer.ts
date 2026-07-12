import { useState, useEffect, useRef, useCallback } from 'react';

export function useTimer(initialSeconds: number, onExpire: () => void) {
  const [secondsLeft, setSecondsLeft] = useState(initialSeconds);
  const [isRunning, setIsRunning] = useState(false);
  const intervalRef = useRef<number | null>(null);
  const onExpireRef = useRef(onExpire);

  // Keep callback ref up to date
  useEffect(() => {
    onExpireRef.current = onExpire;
  }, [onExpire]);

  const start = useCallback(() => setIsRunning(true), []);
  const pause = useCallback(() => setIsRunning(false), []);
  const reset = useCallback(() => {
    setIsRunning(false);
    setSecondsLeft(initialSeconds);
  }, [initialSeconds]);

  useEffect(() => {
    if (!isRunning) {
      if (intervalRef.current) clearInterval(intervalRef.current);
      return;
    }

    intervalRef.current = window.setInterval(() => {
      setSecondsLeft(prev => {
        if (prev <= 1) {
          clearInterval(intervalRef.current!);
          setIsRunning(false);
          onExpireRef.current();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [isRunning]);

  const percentLeft = (secondsLeft / initialSeconds) * 100;
  const isLow = secondsLeft <= 60;
  const isCritical = secondsLeft <= 30;

  return { secondsLeft, percentLeft, isLow, isCritical, isRunning, start, pause, reset };
}
