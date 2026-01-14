import { useRef } from 'react';

import cn from 'classnames';

import { Search } from '@/shared/assets';

import './Input.scss';

export interface InputProps {
  variant: 'filter' | 'form';
  name: string;
  placeholder?: string;
  value?: string;
  onChange?: (value: string) => void;
  size?: 'small' | 'big';
  className?: string;
}

export const Input = (props: InputProps) => {
  const {
    variant,
    name,
    placeholder,
    value,
    onChange,
    size = 'big',
    className
  } = props;

  const inputRef = useRef<HTMLInputElement>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange?.(e.target.value);
  };

  const handleOnContainerClick = () => {
    inputRef.current?.focus();
  };

  return (
    <div
      className={cn(`input-wrapper_${size}`, className, {
        'input-wrapper__filter': variant === 'filter',
        'input-wrapper__form': variant === 'form'
      })}
      onClick={handleOnContainerClick}
    >
      <div className='input-wrapper__inner'>
        {variant === 'filter' && <Search />}
        <input
          ref={inputRef}
          name={name}
          className='input'
          placeholder={placeholder}
          type='text'
          value={value}
          onChange={handleChange}
        />
      </div>
    </div>
  );
};
