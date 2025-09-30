import { useState } from 'react';

import { Input } from '@/components';
import { Layout } from '@/components';
import { Loader } from '@/components';
import { Logo } from '@/components';
import { Select } from '@/components';
import { StatusCircle, type StatusesType } from '@/components';
import { type SelectOptionContentProps } from '@/components';
import { STATUS_OPTIONS } from '@/constants';
import { CharacterCard } from '@/widgets';
import { FilterPanel } from '@/widgets';

import './CharacterList.css';

const CHARACTER_CARD_INFO = {
  id: 1,
  name: 'Rick Sanches',
  gender: 'Male',
  species: 'Human',
  location: 'Earth',
  status: 'Alive',
  imageSrc: '/src/assets/images/avatar.png'
};

export const CharacterList: React.FunctionComponent = () => {
  const [currentValue, setCurrentValue] = useState('');

  const handleInputChange = (value: string) => {
    setCurrentValue(value);
  };

  return (
    <Layout>
      <div className='character-list'>
        <Logo />
        <FilterPanel />
        <Input
          variant='form'
          value={currentValue}
          name='character-name'
          onChange={handleInputChange}
          size='big'
        />
        <Select
          variant='small'
          options={STATUS_OPTIONS}
          SelectOptionComponent={(props: SelectOptionContentProps) => (
            <>
              {props.value}

              <StatusCircle status={props.value as StatusesType} />
            </>
          )}
        />
        <CharacterCard character={CHARACTER_CARD_INFO} />
        <Loader
          text='Loading characters...'
          size='large'
        />
      </div>
    </Layout>
  );
};
