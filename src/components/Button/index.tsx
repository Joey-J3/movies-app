import React, { ReactNode } from "react";
import buttonStyle from "./button.module.scss";

interface Button {
  children: ReactNode;
  type?: "reset" | "submit";
  styleObject?: React.CSSProperties;
  onClick?: React.MouseEventHandler<HTMLDivElement>;
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
    <div
      className={`${buttonStyle.button} ${buttonStyle[`button--${type}`]} ${
        className || ""
      }`}
      tabIndex={1}
      style={style}
      onClick={onClick}
    >
      {children}
    </div>
  );
}

export default Button;
