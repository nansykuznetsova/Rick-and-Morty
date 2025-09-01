import cn from "classnames";
import "./Loader.css"

type SizeVariant = "small" | "large";

interface RotatingImageProps {
    text?: string;
    size?: SizeVariant;
}

export const Loader: React.FC<RotatingImageProps> = ({ text , size }: RotatingImageProps) => {
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
    )
}