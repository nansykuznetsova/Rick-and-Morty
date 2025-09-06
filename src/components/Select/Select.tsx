import { useState, useEffect, useRef } from "react";

import ArrowCloseIcon from "../../assets/icons/arrow-close.svg?react";
import ArrowOpenIcon from "../../assets/icons/arrow-open.svg?react";

import "./Select.css";

const options: string[] = ["Human", "Alien", "Humanoid", "Animal", "Robot"];

export const Select: React.FC = () => {
  const [display, setDisplay] = useState<boolean>(false);
  const [selected, setSelected] = useState<string>("");
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

  const handleClickOption = (item) => {
    setSelected(item);
    setDisplay(false);
  };
  return (
    <div className="select" ref={selectRef}>
      <button type="button" className="select-button" onClick={handleClick}>
        {selected || "Species"}
        {display ? <ArrowOpenIcon /> : <ArrowCloseIcon />}
      </button>
      {display && options.length && (
        <ul className="select-options" role="listbox">
          {options.map((item) => (
            <li
              key={item}
              className={`select-option ${item === selected ? "selected" : ""}`}
              role="option"
              onClick={() => handleClickOption(item)}
            >
              {item}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};
