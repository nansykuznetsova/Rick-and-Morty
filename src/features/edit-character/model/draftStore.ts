import { create } from 'zustand';

import { type CharacterCardTypes } from '@/entities/character';

type CharacterDraft = Partial<CharacterCardTypes>;

interface DraftStore {
  drafts: Record<string, CharacterDraft>;
  setDraft: (id: number, draft: CharacterDraft) => void;
}

export const useDraftStore = create<DraftStore>((set) => ({
  drafts: {},

  setDraft: (id, draft) =>
    set((state) => ({
      drafts: {
        ...state.drafts,
        [id]: draft
      }
    }))
}));
