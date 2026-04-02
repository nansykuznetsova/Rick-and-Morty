import { useQuery } from '@tanstack/react-query';

import { getCharacterById } from '@/entities/character';

export const useLoadCharacter = (id: number) => {
  return useQuery({
    queryKey: ['character', id],
    queryFn: async ({ signal }) => {
      return await getCharacterById(id, signal);
    },
    enabled: Boolean(id),
    retry: false
  });
};
