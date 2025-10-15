import { useCallback, useEffect, useState } from 'react';

import { FIRST_PAGE_PAGINATION } from '@/constants';
import { getCharacters } from '@/shared';
import { type CharacterCardTypes, type CharacterFilters } from '@/types';

export function useLoadCharacters() {
  const [characters, setCharacters] = useState<CharacterCardTypes[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [filters, setFilters] = useState<CharacterFilters>({});
  const [page, setPage] = useState(FIRST_PAGE_PAGINATION);
  const [hasMore, setHasMore] = useState(true);
  const [isLoadingMore, setIsLoadingMore] = useState(false);

  const loadCharacters = useCallback(
    (filters: CharacterFilters) => {
      if (page === FIRST_PAGE_PAGINATION) {
        setIsLoading(true);
      } else {
        setIsLoadingMore(true);
      }

      getCharacters({ ...filters, page })
        .then((data) => {
          if (page === FIRST_PAGE_PAGINATION) {
            setCharacters(data.results);
          } else {
            setCharacters((prev) => [...prev, ...data.results]);
          }

          setHasMore(Boolean(data.info?.next));
        })
        .finally(() => setIsLoading(false));
    },
    [filters, page]
  );

  useEffect(() => {
    loadCharacters(filters);
  }, [loadCharacters]);

  return {
    characters,
    isLoading,
    filters,
    setFilters,
    setPage,
    hasMore,
    isLoadingMore
  };
}
