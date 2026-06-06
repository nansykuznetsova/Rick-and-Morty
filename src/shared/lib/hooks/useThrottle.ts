import { useCallback, useEffect, useRef } from 'react';

export function useThrottle(callback: () => void, delay: number) {
  const callbackRef = useRef(callback);
  const lastCallRef = useRef<number>(0);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  callbackRef.current = callback;

  useEffect(() => {
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, []);

  return useCallback(() => {
    const now = Date.now();
    const elapsed = now - lastCallRef.current;

    if (elapsed >= delay) {
      lastCallRef.current = now;
      callbackRef.current();
      return;
    }

    if (!timerRef.current) {
      timerRef.current = setTimeout(() => {
        lastCallRef.current = Date.now();
        timerRef.current = null;
        callbackRef.current();
      }, delay - elapsed);
    }
  }, [delay]);
}
