import { useState } from 'react';

import { Input } from '@/components/Input/Input.tsx';
import { Layout } from '@/components/Layout/Layout';
import { Loader } from '@/components/Loader/Loader';
import { Logo } from '@/components/Logo/Logo';
import { Select } from '@/components/Select/Select';
import { StatusCircle, type StatusesType } from '@/components/Status/Status';
import { STATUS_OPTIONS } from '@/constants';
import { SelectorPanel } from '@/widgets/SelectorPanel/SelectorPanel';

import { type SelectOptionContentProps } from '../components/Select/Select.tsx';

import './CharacterList.css';

export const CharacterList: React.FunctionComponent = () => {
  const [currentValue, setCurrentValue] = useState('');

  const handleInputChange = (value: string) => {
    setCurrentValue(value);
  };

  return (
    <Layout>
      <div className='character-list'>
        <Logo />
        <SelectorPanel />
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
        <Loader
          text='Loading characters...'
          size='large'
        />
      </div>
    </Layout>
  );
};
