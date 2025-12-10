export interface CharacterFilters {
  name?: string;
  status?: string;
  species?: string;
  gender?: string;
  page?: number;
}

export interface OptionType {
  label: string;
  value: string;
}

export type OptionTypes = OptionType[];
