import { useState } from 'react';

import { GENDER_OPTIONS, SPECIES_OPTIONS, STATUS_OPTIONS } from '@/constants';
import { Input, Select } from '@/shared';
import { type CharacterFilters } from '@/types';

import './FilterPanel.scss';

interface FilterPanelProps {
  filters: CharacterFilters;
  onChangeFilters: (newFilters: CharacterFilters) => void;
  onChangeInput: (value: CharacterFilters) => void;
}

export const FilterPanel: React.FunctionComponent<FilterPanelProps> = ({
  filters,
  onChangeFilters,
  onChangeInput
}) => {
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
