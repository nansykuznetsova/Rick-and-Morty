import { useEffect, useState } from 'react';

import type { AxiosError } from 'axios';

import { getCharacterById } from '@/shared/api/getCharacterById';
import { type CharacterDetailsType } from '@/types';

export const useLoadCharacter = (id: number) => {
  const [character, setCharacter] = useState<CharacterDetailsType | null>(null);
  const [loading, setLoading] = useState(true);
  const [isError, setIsError] = useState<string | null>(null);

  // загружает данные персонажа по id, обработка ошибок, 404
  useEffect(() => {
    if (!id) return;

    const controller = new AbortController();

    const fetchCharacter = async () => {
      try {
        setLoading(true);
        setIsError(null);

        const data = await getCharacterById(id, controller.signal);
        setCharacter(data);
      } catch (error: unknown) {
        if (controller.signal.aborted) {
          return;
        }

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
        if (!controller.signal.aborted) {
          setLoading(false);
        }
      }
    };

    fetchCharacter();

    return () => {
      controller.abort();
    };
  }, [id]);

  return { character, loading, isError };
};
