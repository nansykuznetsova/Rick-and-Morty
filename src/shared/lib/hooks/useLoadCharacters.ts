import { useCallback, useEffect, useRef, useState } from 'react';

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
  const abortControllerRef = useRef<AbortController | null>(null);

  const loadCharacters = useCallback(
    (filters: CharacterFilters) => {
      abortControllerRef.current?.abort();

      const controller = new AbortController();
      abortControllerRef.current = controller;

      if (page === FIRST_PAGE_PAGINATION) {
        setIsLoading(true);
      } else {
        setIsLoadingMore(true);
      }

      getCharacters({ ...filters, page }, controller.signal)
        .then((data) => {
          if (controller.signal.aborted) return;

          if (page === FIRST_PAGE_PAGINATION) {
            setCharacters(data.results);
          } else {
            setCharacters((prev) => [...prev, ...data.results]);
          }

          setHasMore(Boolean(data.info?.next));
        })
        .catch((error) => {
          if (controller.signal.aborted) return;
          console.error('Failed to fetch characters:', error);
        })
        .finally(() => {
          if (controller.signal.aborted) return;
          setIsLoading(false);
          setIsLoadingMore(false);
        });
    },
    [filters, page]
  );

  // запускает загрузку персонажей и отменяет незавершённый запрос через AbortController
  useEffect(() => {
    loadCharacters(filters);

    return () => {
      abortControllerRef.current?.abort();
    };
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
