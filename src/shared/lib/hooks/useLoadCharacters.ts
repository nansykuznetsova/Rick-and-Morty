import { useCallback, useEffect, useRef } from 'react';

import { FIRST_PAGE_PAGINATION } from '@/constants';
import { getCharacters } from '@/shared';
import { useCharactersStore } from '@/store/characterListStore.ts';

export function useLoadCharacters() {
  const {
    filters,
    page,
    replaceCharacters,
    appendCharacters,
    startInitialLoading,
    startLoadMore,
    finishLoading,
    setHasMore
  } = useCharactersStore();

  const abortControllerRef = useRef<AbortController | null>(null);

  const loadCharacters = useCallback(() => {
    abortControllerRef.current?.abort();

    const controller = new AbortController();
    abortControllerRef.current = controller;

    if (page === FIRST_PAGE_PAGINATION) {
      startInitialLoading();
    } else {
      startLoadMore();
    }

    getCharacters({ ...filters, page }, controller.signal)
      .then((data) => {
        if (controller.signal.aborted) return;

        if (page === FIRST_PAGE_PAGINATION) {
          replaceCharacters(data.results);
        } else {
          appendCharacters(data.results);
        }

        setHasMore(Boolean(data.info?.next));
      })
      .catch((error) => {
        if (controller.signal.aborted) return;
        console.error('Failed to fetch characters:', error);
      })
      .finally(() => {
        if (controller.signal.aborted) return;
        finishLoading();
      });
  }, [
    page,
    filters,
    replaceCharacters,
    appendCharacters,
    startInitialLoading,
    startLoadMore,
    finishLoading,
    setHasMore
  ]);

  // запускает загрузку персонажей и отменяет незавершённый запрос через AbortController
  useEffect(() => {
    loadCharacters();

    return () => {
      abortControllerRef.current?.abort();
    };
  }, [loadCharacters]);
}
