import { useEffect } from 'react';

import type { AxiosError } from 'axios';

import { getCharacterById } from '@/shared/api/getCharacterById';
import { useCharacterDetailsStore } from '@/store/characterDetailsStore.ts';

export const useLoadCharacter = (id: number) => {
  const { setCharacter, startLoading, setError, finishLoading } =
    useCharacterDetailsStore();

  // загружает данные персонажа по id, обработка ошибок, 404
  useEffect(() => {
    if (!id) return;

    const controller = new AbortController();

    const fetchCharacter = async () => {
      try {
        startLoading();

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
          setError('Error 404: Character not found.');
        } else {
          console.error('Failed to fetch character:', error);
          setError('Something went wrong.');
        }
      } finally {
        if (!controller.signal.aborted) {
          finishLoading();
        }
      }
    };

    fetchCharacter();

    return () => {
      controller.abort();
    };
  }, [id]);
};
