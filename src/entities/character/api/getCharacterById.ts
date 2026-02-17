import {
  type ApiResponseCharacter,
  type CharacterDetailsType,
  normalizeStatus
} from '@/entities/character';
import { apiClient } from '@/shared/api';

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
      status: normalizeStatus(char.status),
      image: char.image
    };
  } catch (error) {
    console.error(`Data with id=${id} not found`, error);
    throw error;
  }
};
