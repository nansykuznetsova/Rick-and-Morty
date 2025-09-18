import { Select } from '@/components/Select/Select';
import { Input } from '@/components/Input/Input';
import { SPECIES_OPTIONS, GENDER_OPTIONS, STATUS_OPTIONS } from '@/constants';

import './SelectorPanel.css';

export const SelectorPanel: React.FunctionComponent = () => {
  return (
    <div className='selector-panel'>
      <Input
        variant='filter'
        placeholder='Filter by name...'
        name='search'
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
