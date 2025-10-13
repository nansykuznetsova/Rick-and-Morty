import { useCallback, useRef } from 'react';

export function useDebounce<T>(callback: (value: T) => void, delay: number) {
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);

  return useCallback(
    (value: T) => {
      if (timer.current) {
        clearTimeout(timer.current);
      }

      timer.current = setTimeout(() => {
        callback(value);
      }, delay);
    },
    [callback, delay]
  );
}
