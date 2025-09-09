import { useState, useEffect, useRef } from "react";
import cn from "classnames";

import { StatusCircle } from "../Status/Status.tsx";
import { STATUS_COLORS } from "../../constants/options.ts";

import ArrowCloseIcon from "../../assets/icons/arrow-close.svg?react";
import ArrowOpenIcon from "../../assets/icons/arrow-open.svg?react";

import "./Select.css";

export interface Option {
  label: string;
  value: string;
}

export interface SelectProps {
  options: Option[];
  variant?: "default" | "small";
  value?: string;
  placeholder: string;
  onChange?: (value: string) => void;
}

export const Select: React.FC<SelectProps> = ({
  options,
  variant,
  value = "Alive",
  placeholder,
  onChange,
}) => {
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

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
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
      className={cn("select", {
        "select-small": variant === "small",
      })}
      ref={selectRef}
    >
      <button
        type="button"
        className={cn("select-button", {
          "select-button-small": variant === "small",
        })}
        onClick={handleClick}
      >
        {variant === "small" ? (
          <div className="button-inner">
            {selected?.label || value}
            <StatusCircle
              color={STATUS_COLORS[selected?.value || value.toLowerCase()]}
            />
          </div>
        ) : (
          selected?.label || placeholder
        )}
        {display ? <ArrowOpenIcon /> : <ArrowCloseIcon />}
      </button>
      {display && options.length && (
        <ul
          className={cn("select-options", {
            "select-options-small": variant === "small",
          })}
          role="listbox"
        >
          {options.map((item) => (
            <li
              key={item.value}
              className={cn("select-option", {
                selected: item.value === selected?.value,
                "select-option-small": variant === "small",
              })}
              role="option"
              onClick={() => handleClickOption(item)}
            >
              {item.label}
              {variant === "small" && (
                <StatusCircle color={STATUS_COLORS[item.value]} />
              )}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};
