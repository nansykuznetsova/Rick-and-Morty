import { Input } from '@/components';
import { Select } from '@/components';
import { GENDER_OPTIONS, SPECIES_OPTIONS, STATUS_OPTIONS } from '@/constants';
import { type CharacterFilters } from '@/types';

import './FilterPanel.css';

interface FilterPanelProps {
  filters: CharacterFilters;
  onChange: (newFilters: CharacterFilters) => void;
}

export const FilterPanel: React.FunctionComponent<FilterPanelProps> = ({
  filters,
  onChange
}) => {
  const handleInputChange = (value: string) => {
    onChange({ name: value });
  };

  const handleSelectSpecies = (value: string) => {
    onChange({ species: value || undefined });
  };

  const handleSelectGender = (value: string) => {
    onChange({ gender: value || undefined });
  };

  const handleSelectStatus = (value: string) => {
    onChange({ status: value || undefined });
  };

  return (
    <div className='selector-panel'>
      <Input
        variant='filter'
        placeholder='Filter by name...'
        name='search'
        value={filters.name || ''}
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
