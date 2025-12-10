import { useEffect, useState } from 'react';

import type { AxiosError } from 'axios';

import { getCharacterById } from '@/shared/api/getCharacterById';
import { type CharacterDetailsType } from '@/types';

export const useLoadCharacter = (id: number) => {
  const [character, setCharacter] = useState<CharacterDetailsType | null>(null);
  const [loading, setLoading] = useState(true);
  const [isError, setIsError] = useState<string | null>(null);

  //загружает данные персонажа по id, обработка ошибок, 404
  useEffect(() => {
    const fetchCharacter = async () => {
      try {
        setLoading(true);
        const data = await getCharacterById(id);
        setCharacter(data);
      } catch (error: unknown) {
        const axiosError = error as AxiosError;

        const status = axiosError.response?.status;

        if (status === 404) {
          setCharacter(null);
          setIsError('Error 404: Character not found.');
        } else {
          console.error('Failed to fetch character:', error);
          setIsError('Something went wrong.');
        }
      } finally {
        setLoading(false);
      }
    };

    if (id) fetchCharacter();
  }, [id]);

  return { character, loading, isError };
};
