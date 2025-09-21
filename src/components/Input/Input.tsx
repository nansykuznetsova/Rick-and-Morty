import cn from 'classnames';

import Search from '@/assets/icons/search.svg?react';

import './Input.css';

export interface InputProps {
  variant: 'filter' | 'form';
  name: string;
  placeholder?: string;
  value?: string;
  onChange?: (value: string) => void;
  size?: 'small' | 'big';
}

export const Input = (props: InputProps) => {
  const { variant, name, placeholder, value, onChange, size = 'big' } = props;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
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
          className={cn('input', `input_size_${size}`)}
          placeholder={placeholder}
          type='text'
          value={value}
          onChange={handleChange}
        />
      </div>
    </div>
  );
};
