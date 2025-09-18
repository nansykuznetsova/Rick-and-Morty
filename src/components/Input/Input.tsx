import cn from 'classnames';
import { useState } from 'react';
import Search from '@/assets/icons/search.svg?react';

import './Input.css';

export interface InputProps {
  variant: 'filter' | 'form';
  name: string;
  placeholder?: string;
  value?: string;
  onChange?: (value: string) => void;
}

export const Input = (props: InputProps) => {
  const { variant, name, placeholder, value, onChange } = props;
  const [currentValue, setCurrentValue] = useState(value);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCurrentValue(e.target.value);
    onChange?.(e.target.value);
  };

  return (
    <div
      className={cn({
        input__wrapper_filter: variant === 'filter',
        input__wrapper_form: variant === 'form'
      })}
    >
      <div className='input__inner'>
        {variant === 'filter' && <Search />}
        <input
          name={name}
          className={cn('input', {
            input_filter: variant === 'filter',
            input_form: variant === 'form'
          })}
          placeholder={placeholder}
          type='text'
          value={currentValue}
          onChange={handleChange}
        />
      </div>
    </div>
  );
};
