import cn from 'classnames';

import { Search } from '@/shared/assets';

import './Input.css';

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

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange?.(e.target.value);
  };

  return (
    <div
      className={cn(`input-wrapper_${size}`, className, {
        'input-wrapper__filter': variant === 'filter',
        'input-wrapper__form': variant === 'form'
      })}
    >
      <div className='input-wrapper__inner'>
        {variant === 'filter' && <Search />}
        <input
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
