import { useCallback, useEffect, useState } from 'react';

import { DEBOUNCE_DELAY, FIRST_PAGE_PAGINATION } from '@/constants';
import { getCharacters, useDebounce } from '@/shared';
import { type CharacterCardTypes, type CharacterFilters } from '@/types';

export function useLoadCharacters() {
  const [characters, setCharacters] = useState<CharacterCardTypes[]>([]);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState<CharacterFilters>({});
  const [page, setPage] = useState(FIRST_PAGE_PAGINATION);

  const debouncedName = useDebounce(filters.name, DEBOUNCE_DELAY);

  const loadCharacters = useCallback(
    async (filters: CharacterFilters) => {
      setLoading(true);
      getCharacters({ ...filters, page, name: debouncedName })
        .then((data) => setCharacters(data))
        .finally(() => setLoading(false));
    },
    [debouncedName, page]
  );

  useEffect(() => {
    loadCharacters(filters);
  }, [filters, loadCharacters]);

  return {
    characters,
    loading,
    filters,
    setFilters,
    setPage
  };
}
