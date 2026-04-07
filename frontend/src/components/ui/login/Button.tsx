import { type ReactNode } from "react";

type ButtonProps = {
  text: string;
  icon?: ReactNode;
  color: string;
  size: string;
  iconPosition: "left" | "right";
  img?: string;
};

const Button = ({
  text,
  icon,
  color,
  size,
  iconPosition,
  img,
}: ButtonProps) => {
  return (
    <div
      className={`cursor-pointer px-6 py-4 justify-center rounded-md inline-flex items-center gap-2 ${
        iconPosition === "left" ? "flex-row-reverse" : ""
      }`}
      style={{ backgroundColor: color, width: size }}
    >
      <span>{text}</span>
      <span className="max-w-[10%]">
        {iconPosition === "left" ? (
          <img className="w-full h-auto object-cover" src={img} alt={text} />
        ) : (
          icon
        )}
      </span>
    </div>
  );
};

export default Button;