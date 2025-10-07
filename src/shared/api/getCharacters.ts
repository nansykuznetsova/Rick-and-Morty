import toast from 'react-hot-toast';

import { apiClient } from '@/shared';
import {
  type ApiResponse,
  type CharacterCardTypes,
  type CharacterStatus
} from '@/types/character';

export const getCharacters = async () => {
  try {
    const response = await apiClient.get<ApiResponse>('character/', {
      params: {
        page: 1
      }
    });
    return response.data.results.map(
      (char): CharacterCardTypes => ({
        id: char.id,
        name: char.name,
        gender: char.gender,
        species: char.species,
        location: char.location,
        status: char.status.toLowerCase() as CharacterStatus,
        image: char.image
      })
    );
  } catch (error) {
    toast.error('Не удалось загрузить список персонажей');
    return [];
  }
};
