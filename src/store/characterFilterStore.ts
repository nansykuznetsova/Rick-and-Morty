import { create } from 'zustand';

import { type CharacterFilters } from '@/types';

interface CharacterFilterStore {
  filters: CharacterFilters;
  setFilters: (filters: CharacterFilters) => void;
}

export const useFilterStore = create<CharacterFilterStore>((set) => ({
  filters: {},

  setFilters: (filters) =>
    set((state) => ({
      filters: { ...state.filters, ...filters }
    }))
}));
