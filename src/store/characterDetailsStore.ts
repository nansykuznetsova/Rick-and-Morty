import { create } from 'zustand';

import { type CharacterDetailsType } from '@/types';

interface CharacterDetailsStore {
  character: CharacterDetailsType | null;
  isLoading: boolean;
  isError: string | null;

  // actions
  setCharacter: (character: CharacterDetailsType | null) => void;
  startLoading: () => void;
  setError: (error: string | null) => void;
  finishLoading: () => void;
}

export const useCharacterDetailsStore = create<CharacterDetailsStore>(
  (set) => ({
    // state
    character: null,
    isLoading: true,
    isError: null,

    // actions
    setCharacter: (character) => set({ character }),

    startLoading: () =>
      set({
        isLoading: true,
        isError: null
      }),

    setError: (isError) =>
      set({
        isError,
        isLoading: false
      }),

    finishLoading: () =>
      set({
        isLoading: false
      })
  })
);
