type CharacterStatus = 'alive' | 'dead' | 'unknown';

export interface CharacterCardTypes {
  id: number;
  name: string;
  gender: string;
  species: string;
  location: string;
  status: CharacterStatus;
  imageSrc: string;
}
