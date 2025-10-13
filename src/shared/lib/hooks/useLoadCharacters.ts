import { useCallback, useEffect, useState } from 'react';

import { FIRST_PAGE_PAGINATION } from '@/constants';
import { getCharacters } from '@/shared';
import { type CharacterCardTypes, type CharacterFilters } from '@/types';

export function useLoadCharacters() {
  const [characters, setCharacters] = useState<CharacterCardTypes[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [filters, setFilters] = useState<CharacterFilters>({});
  const [page, setPage] = useState(FIRST_PAGE_PAGINATION);

  const loadCharacters = useCallback(
    (filters: CharacterFilters) => {
      setIsLoading(true);
      getCharacters({ ...filters, page })
        .then((data) => setCharacters(data))
        .finally(() => setIsLoading(false));
    },
    [page]
  );

  useEffect(() => {
    loadCharacters(filters);
  }, [filters, loadCharacters]);

  return {
    characters,
    isLoading,
    filters,
    setFilters,
    setPage
  };
}
