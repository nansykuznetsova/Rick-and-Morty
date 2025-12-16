import toast from 'react-hot-toast';

import { apiClient } from '@/shared';
import {
  type ApiResponse,
  type CharacterCardTypes,
  type CharacterStatus
} from '@/types';
import { type CharacterFilters } from '@/types';

export const getCharacters = async (
  filters: CharacterFilters,
  signal?: AbortSignal
) => {
  try {
    const params = new URLSearchParams();

    Object.entries(filters || {}).forEach(([key, value]) => {
      if (value !== undefined && value !== null && value !== '') {
        params.append(key, String(value));
      }
    });

    const response = await apiClient.get<ApiResponse>('character/', {
      params,
      signal
    });
    return {
      results: response.data.results.map(
        (char): CharacterCardTypes => ({
          id: char.id,
          name: char.name,
          gender: char.gender,
          species: char.species,
          location: char.location,
          status: char.status.toLowerCase() as CharacterStatus,
          image: char.image
        })
      ),
      info: response.data.info
    };
  } catch (error) {
    console.error('Failed to load character list', error);
    toast.error('Failed to load character list');
    return { results: [], info: { next: null } };
  }
};
