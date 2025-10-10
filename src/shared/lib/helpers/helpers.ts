import { type CharacterStatus } from '@/types';

export const formatStatus = (status: CharacterStatus) => {
  switch (status) {
    case 'alive':
      return 'Alive';
    case 'dead':
      return 'Dead';
    case 'unknown':
      return 'Unknown';
  }
};
