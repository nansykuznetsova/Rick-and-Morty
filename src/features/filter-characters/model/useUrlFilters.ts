import { useEffect, useRef } from 'react';
import { useSearchParams } from 'react-router-dom';

import { useFilterStore } from './filterStore';

type StringFilterKey = 'name' | 'status' | 'species' | 'gender';

const FILTER_KEYS: StringFilterKey[] = ['name', 'status', 'species', 'gender'];

export function useUrlFilters() {
  const [searchParams, setSearchParams] = useSearchParams();
  const { filters, setFilters } = useFilterStore();
  const initialSearchParams = useRef(searchParams);

  useEffect(() => {
    const urlFilters: Partial<Record<StringFilterKey, string>> = {};
    FILTER_KEYS.forEach((key) => {
      const value = initialSearchParams.current.get(key);
      if (value) urlFilters[key] = value;
    });
    if (Object.keys(urlFilters).length > 0) {
      setFilters(urlFilters);
    }
  }, [setFilters]);

  useEffect(() => {
    const params = new URLSearchParams();
    FILTER_KEYS.forEach((key) => {
      const value = filters[key];
      if (value) params.set(key, value);
    });
    setSearchParams(params, { replace: true });
  }, [filters, setSearchParams]);
}
