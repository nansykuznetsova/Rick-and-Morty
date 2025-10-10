import { useEffect, useState } from 'react';

import { DEBOUNCE_DELAY } from '@/constants';

export function useDebounce<T>(value: T, delay = DEBOUNCE_DELAY): T {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);

  return debouncedValue;
}
