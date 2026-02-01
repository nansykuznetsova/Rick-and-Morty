import { type InfiniteData, useInfiniteQuery } from '@tanstack/react-query';

import { FIRST_PAGE_PAGINATION } from '@/constants';
import { getCharacters } from '@/shared';
import { useFilterStore } from '@/store';
import type { CharacterCardTypes } from '@/types';

interface CharactersPage {
  results: CharacterCardTypes[];
  hasNextPage: boolean;
}

export function useLoadCharacters() {
  const { filters } = useFilterStore();

  return useInfiniteQuery<
    CharactersPage,
    Error,
    InfiniteData<CharactersPage>,
    ['charactersLoad', typeof filters],
    number
  >({
    queryKey: ['charactersLoad', filters],
    initialPageParam: FIRST_PAGE_PAGINATION,
    queryFn: async ({ pageParam, signal }) => {
      const response = await getCharacters(
        { ...filters, page: pageParam },
        signal
      );

      return {
        results: response.results,
        hasNextPage: Boolean(response.info.next)
      };
    },
    getNextPageParam: (lastPage, allPages) =>
      lastPage.hasNextPage ? allPages.length + 1 : undefined
  });
}
