import { apiClient } from '@/shared';
import {
  type ApiResponseCharacter,
  type CharacterDetailsType,
  type CharacterStatus
} from '@/types';

export const getCharacterById = async (
  id: number | string,
  signal?: AbortSignal
): Promise<CharacterDetailsType | null> => {
  try {
    const response = await apiClient.get<ApiResponseCharacter>(
      `character/${id}`,
      {
        signal
      }
    );

    const char = response.data;

    return {
      id: char.id,
      name: char.name,
      gender: char.gender,
      species: char.species,
      type: char.type,
      origin: char.origin,
      location: char.location,
      status: char.status.toLowerCase() as CharacterStatus,
      image: char.image
    };
  } catch (error) {
    console.error(`Data with id=${id} not found`, error);
    throw error;
  }
};
