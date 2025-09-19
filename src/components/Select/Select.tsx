import { useState, useEffect, useRef } from 'react';

import cn from 'classnames';

import ArrowCloseIcon from '@/assets/icons/arrow-close.svg?react';
import ArrowOpenIcon from '@/assets/icons/arrow-open.svg?react';

import './Select.css';

export interface Option {
  label: string;
  value: string;
}

interface SelectOptionContentProps {
  value?: string;
}

export const DefaultSelectOptionContent = (props: SelectOptionContentProps) => {
  return <>{props.value}</>;
};

export interface SelectProps {
  options: Option[];
  variant?: 'default' | 'small';
  value?: string;
  placeholder?: string;
  onChange?: (value: string) => void;
  SelectOptionComponent?: React.FC<SelectOptionContentProps>;
}

export const Select = (props: SelectProps) => {
  const {
    options,
    variant = 'default',
    value = 'Alive',
    placeholder,
    onChange,
    SelectOptionComponent = DefaultSelectOptionContent
  } = props;

  const [display, setDisplay] = useState<boolean>(false);
  const [selected, setSelected] = useState<Option | null>(null);
  const selectRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        selectRef.current &&
        !selectRef.current.contains(event.target as Node)
      ) {
        setDisplay(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleClick = () => setDisplay(!display);

  const handleClickOption = (item: Option) => {
    setSelected(item);
    setDisplay(false);
    onChange?.(item.value);
  };

  return (
    <div
      className={cn('select', {
        select_small: variant === 'small'
      })}
      ref={selectRef}
    >
      <button
        type='button'
        className={cn('select__button', {
          select__button_small: variant === 'small'
        })}
        onClick={handleClick}
      >
        {variant === 'small' ? (
          <div className='select__button-inner'>
            <SelectOptionComponent value={selected?.label || value} />
          </div>
        ) : (
          <SelectOptionComponent value={selected?.label || placeholder} />
        )}
        {display ? <ArrowOpenIcon /> : <ArrowCloseIcon />}
      </button>
      {display && options.length && (
        <ul
          className={cn('select__options', {
            select__options_small: variant === 'small'
          })}
          role='listbox'
        >
          {options.map((item) => (
            <li
              key={item.value}
              className={cn('select__option', {
                select__option_selected: item.value === selected?.value,
                select__option_small: variant === 'small'
              })}
              role='option'
              onClick={() => handleClickOption(item)}
            >
              <SelectOptionComponent value={item.label} />
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};
