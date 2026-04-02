import toast from 'react-hot-toast';

import axios from 'axios';

import {
  type ApiResponse,
  type CharacterCardTypes,
  type CharacterFilters,
  normalizeStatus
} from '@/entities/character';
import { apiClient } from '@/shared/api';

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
          status: normalizeStatus(char.status),
          image: char.image
        })
      ),
      info: response.data.info
    };
  } catch (error) {
    if (axios.isAxiosError(error) && error.code === 'ERR_CANCELED') {
      throw error;
    }
    toast.error('Failed to load character list');
    throw error;
  }
};
