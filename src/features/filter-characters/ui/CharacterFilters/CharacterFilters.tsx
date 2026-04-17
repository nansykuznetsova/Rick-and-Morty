import { useState } from 'react';
import { useTranslation } from 'react-i18next';

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
  const { t } = useTranslation();
  const { filters } = useFilterStore();
  const [searchValue, setSearchValue] = useState(filters.name || '');
  const speciesOptions = SPECIES_OPTIONS.map((option) => ({
    ...option,
    label: t(`speciesOptions.${option.value}`, { defaultValue: option.label })
  }));
  const genderOptions = GENDER_OPTIONS.map((option) => ({
    ...option,
    label: t(`genderOptions.${option.value}`, { defaultValue: option.label })
  }));
  const statusOptions = STATUS_OPTIONS.map((option) => ({
    ...option,
    label: t(`statusOptions.${option.value}`, { defaultValue: option.label })
  }));

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
        placeholder={t('filters.name')}
        name='search'
        value={searchValue}
        onChange={handleInputChange}
        size='small'
      />
      <Select
        placeholder={t('filters.species')}
        options={speciesOptions}
        value={filters.species || ''}
        onChange={handleSelectSpecies}
      />
      <Select
        placeholder={t('filters.gender')}
        options={genderOptions}
        value={filters.gender || ''}
        onChange={handleSelectGender}
      />
      <Select
        placeholder={t('filters.status')}
        options={statusOptions}
        value={filters.status || ''}
        onChange={handleSelectStatus}
      />
    </div>
  );
};
