export type ApiCharacterStatus = 'Alive' | 'Dead' | 'unknown';
export type CharacterStatus = 'alive' | 'dead' | 'unknown';

export const normalizeStatus = <T extends ApiCharacterStatus>(
  status: T
): Lowercase<T> => status.toLowerCase() as Lowercase<T>;

export interface CharacterCardTypes {
  id: number;
  name: string;
  gender: string;
  species: string;
  location: {
    name: string;
    url: string;
  };
  status: CharacterStatus;
  image: string;
}

export interface Character {
  id: number;
  name: string;
  status: ApiCharacterStatus;
  species: string;
  type: string;
  gender: string;
  origin: {
    name: string;
    url: string;
  };
  location: {
    name: string;
    url: string;
  };
  image: string;
  episode: string[];
  url: string;
  created: string;
}

export interface ApiResponse {
  info: {
    count: number;
    pages: number;
    next: string | null;
    prev: string | null;
  };
  results: Character[];
}

export interface CharacterDetailsType {
  id: number;
  name: string;
  status: CharacterStatus;
  type: string;
  species: string;
  origin: { name: string };
  gender: string;
  location: { name: string; url: string };
  image: string;
}

export interface ApiResponseCharacter {
  id: number;
  name: string;
  status: ApiCharacterStatus;
  species: string;
  gender: string;
  type: string;
  origin: { name: string };
  location: { name: string; url: string };
  image: string;
}
