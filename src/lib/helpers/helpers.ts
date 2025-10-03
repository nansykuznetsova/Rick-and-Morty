import { type CharacterStatus } from '@/types/character';

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
