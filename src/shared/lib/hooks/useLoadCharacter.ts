import { useQuery } from '@tanstack/react-query';

import { getCharacterById } from '@/shared/api/getCharacterById';

export const useLoadCharacter = (id: number) => {
  return useQuery({
    queryKey: ['character', id],
    queryFn: async () => {
      if (!id) throw new Error('Invalid id');
      return await getCharacterById(id);
    },
    enabled: Boolean(id),
    retry: false
  });
};
