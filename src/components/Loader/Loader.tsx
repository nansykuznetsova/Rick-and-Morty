import cn from "classnames";

import "./Loader.css";

interface LoaderProps {
  text?: string;
  size?: "small" | "large"; // union прямо в интерфейсе
}

export const Loader = ({ text, size }: LoaderProps) => {
  return (
    <div className="loader">
      <img
        src="/src/assets/images/loader.png"
        alt="загружаем информацию"
        className={cn("loader-rotating", {
          small: size === "small",
          large: size === "large",
        })}
      />
      <p>{text}</p>
    </div>
  );
};
