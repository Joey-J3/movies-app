import React, { ReactNode } from "react";
import buttonStyle from "./button.module.scss";

interface Button {
  children: ReactNode;
  type?: "reset" | "submit";
  styleObject?: React.CSSProperties;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
  className?: string;
}

function Button({
  children,
  type = "reset",
  styleObject = {},
  onClick,
  className,
}: Button) {
  const style = Object.assign({}, styleObject);
  return (
    <button
      className={`${buttonStyle.button} ${buttonStyle[`button--${type}`]} ${
        className || ""
      }`}
      tabIndex={1}
      style={style}
      type={type}
      onClick={onClick}
    >
      {children}
    </button>
  );
}

export default Button;
