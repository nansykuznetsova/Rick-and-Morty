import toast from 'react-hot-toast';

import { apiClient } from '@/shared';
import {
  type ApiResponse,
  type CharacterCardTypes,
  type CharacterStatus
} from '@/types/character';
import { type CharacterFilters } from '@/types/filters';

export const getCharacters = async (filters: CharacterFilters) => {
  try {
    const params = new URLSearchParams();

    Object.entries(filters || {}).forEach(([key, value]) => {
      if (value !== undefined && value !== null && value !== '') {
        params.append(key, String(value));
      }
    });

    const response = await apiClient.get<ApiResponse>('character/', {
      params
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
    console.error(error);
    toast.error('Не удалось загрузить список персонажей');
    return [];
  }
};
