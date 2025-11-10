import toast from 'react-hot-toast';

import { apiClient } from '@/shared';
import {
  type ApiResponseCharacter,
  type CharacterDetailsType,
  type CharacterStatus
} from '@/types';

export const getCharacterById = async (
  id: number | string
): Promise<CharacterDetailsType | null> => {
  try {
    const response = await apiClient.get<ApiResponseCharacter>(
      `character/${id}`
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
    console.error(error);
    toast.error('Failed to load character details');
    return null;
  }
};
