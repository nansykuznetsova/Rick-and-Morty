import { useState } from 'react';

import {
  type CharacterFilters,
  GENDER_OPTIONS,
  SPECIES_OPTIONS,
  STATUS_OPTIONS
} from '@/entities/character';
import { useFilterStore } from '@/features';
import { Input, Select } from '@/shared';

import './CharacterFilters.scss';

interface CharacterFiltersProps {
  onChangeFilters: (newFilters: CharacterFilters) => void;
  onChangeInput: (value: CharacterFilters) => void;
}

export const CharacterFiltersPanel: React.FunctionComponent<
  CharacterFiltersProps
> = ({ onChangeFilters, onChangeInput }) => {
  const { filters } = useFilterStore();
  const [searchValue, setSearchValue] = useState(filters.name || '');

  const handleInputChange = (value: string) => {
    setSearchValue(value);
    onChangeInput({ name: value });
  };

  const handleSelectSpecies = (value: string) => {
    onChangeFilters({ species: value });
  };

  const handleSelectGender = (value: string) => {
    onChangeFilters({ gender: value });
  };

  const handleSelectStatus = (value: string) => {
    onChangeFilters({ status: value });
  };

  return (
    <div className='selector-panel'>
      <Input
        variant='filter'
        placeholder='Filter by name...'
        name='search'
        value={searchValue}
        onChange={handleInputChange}
        size='small'
      />
      <Select
        placeholder='Species'
        options={SPECIES_OPTIONS}
        value={filters.species || ''}
        onChange={handleSelectSpecies}
      />
      <Select
        placeholder='Gender'
        options={GENDER_OPTIONS}
        value={filters.gender || ''}
        onChange={handleSelectGender}
      />
      <Select
        placeholder='Status'
        options={STATUS_OPTIONS}
        value={filters.status || ''}
        onChange={handleSelectStatus}
      />
    </div>
  );
};
