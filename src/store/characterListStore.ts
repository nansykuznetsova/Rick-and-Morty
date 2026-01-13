import { create } from 'zustand';

import { FIRST_PAGE_PAGINATION } from '@/constants';
import { type CharacterCardTypes, type CharacterFilters } from '@/types';

interface CharacterListStore {
  characters: CharacterCardTypes[];
  isLoading: boolean;
  isLoadingMore: boolean;
  filters: CharacterFilters;
  page: number;
  hasMore: boolean;

  // actions
  replaceCharacters: (characters: CharacterCardTypes[]) => void;
  appendCharacters: (characters: CharacterCardTypes[]) => void;
  setPage: (page: number) => void;
  addNextPage: () => void;
  setHasMore: (value: boolean) => void;
  startInitialLoading: () => void;
  startLoadMore: () => void;
  finishLoading: () => void;
  setFilters: (filters: CharacterFilters) => void;
}

export const useCharactersStore = create<CharacterListStore>((set) => ({
  // state
  characters: [],
  isLoading: true,
  isLoadingMore: false,
  filters: {},
  page: FIRST_PAGE_PAGINATION,
  hasMore: true,

  // actions
  replaceCharacters: (characters) => set({ characters }),

  appendCharacters: (characters) =>
    set((state) => ({
      characters: [...state.characters, ...characters]
    })),

  setFilters: (filters) =>
    set((state) => ({
      filters: { ...state.filters, ...filters }
    })),

  setPage: (page) => set({ page }),

  addNextPage: () =>
    set((state) => ({
      page: state.page + 1
    })),

  setHasMore: (hasMore) => set({ hasMore }),

  startInitialLoading: () =>
    set({
      isLoading: true,
      isLoadingMore: false
    }),

  startLoadMore: () =>
    set({
      isLoadingMore: true
    }),

  finishLoading: () =>
    set({
      isLoading: false,
      isLoadingMore: false
    })
}));
