import { useState } from 'react';

import { Input } from '@/components';
import { Select } from '@/components';
import { GENDER_OPTIONS, SPECIES_OPTIONS, STATUS_OPTIONS } from '@/constants';

import './SelectorPanel.css';

export const SelectorPanel: React.FunctionComponent = () => {
  const [currentValue, setCurrentValue] = useState('');

  const handleInputChange = (value: string) => {
    setCurrentValue(value);
  };

  return (
    <div className='selector-panel'>
      <Input
        variant='filter'
        placeholder='Filter by name...'
        name='search'
        value={currentValue}
        onChange={handleInputChange}
        size='small'
      />
      <Select
        placeholder='Species'
        options={SPECIES_OPTIONS}
      />
      <Select
        placeholder='Gender'
        options={GENDER_OPTIONS}
      />
      <Select
        placeholder='Status'
        options={STATUS_OPTIONS}
      />
    </div>
  );
};
