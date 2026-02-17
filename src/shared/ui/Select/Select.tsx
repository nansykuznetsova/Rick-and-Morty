import { useEffect, useRef, useState } from 'react';

import cn from 'classnames';

import { ArrowCloseIcon, ArrowOpenIcon } from '@/shared/assets';

import './Select.scss';

export interface Option<T extends string = string> {
  label: string;
  value: T;
}

export interface SelectOptionContentProps<T extends string = string> {
  value?: string;
  optionValue?: T;
}

export const DefaultSelectOptionContent = <
  T extends string = string
>(
  props: SelectOptionContentProps<T>
) => {
  return <>{props.value}</>;
};

export interface SelectProps<T extends string = string> {
  options: Option<T>[];
  variant?: 'default' | 'small';
  value?: T;
  placeholder?: string;
  onChange?: (value: T) => void;
  SelectOptionComponent?: React.FC<SelectOptionContentProps<T>>;
}

export const Select = <T extends string = string>(props: SelectProps<T>) => {
  const {
    options,
    variant = 'default',
    value,
    placeholder,
    onChange,
    SelectOptionComponent = DefaultSelectOptionContent
  } = props;

  const [display, setDisplay] = useState<boolean>(false);
  const [selected, setSelected] = useState<Option<T> | null>(null);
  const selectRef = useRef<HTMLDivElement>(null);

  // закрывает селект при клике вне компонента
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        selectRef.current &&
        event.target instanceof Node &&
        !selectRef.current.contains(event.target)
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

  const handleClickOption = (item: Option<T>) => {
    setSelected(item);
    setDisplay(false);
    onChange?.(item.value);
  };

  const selectedLabel =
    selected?.label || options.find((item) => item.value === value)?.label || value;

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
            <SelectOptionComponent
              value={selectedLabel}
              optionValue={selected?.value ?? value}
            />
          </div>
        ) : (
          <SelectOptionComponent
            value={selected?.label || placeholder}
            optionValue={selected?.value}
          />
        )}
        {display ? <ArrowOpenIcon /> : <ArrowCloseIcon />}
      </button>
      {display && options.length > 0 && (
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
              <SelectOptionComponent value={item.label} optionValue={item.value} />
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};
