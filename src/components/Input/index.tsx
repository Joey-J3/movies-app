import React from "react";
import inputStyle from "./input.module.scss";

interface InputInterface {
  label: string;
  placeholder?: string;
  id?: string;
  value: string | number | readonly string[];
  onChange: React.ChangeEventHandler<HTMLInputElement | HTMLTextAreaElement>;
  type?: "input" | "textarea";
}

function Input({
  label,
  placeholder,
  id,
  value,
  onChange,
  type = "input",
}: InputInterface) {
  return (
    <span className={inputStyle.input}>
      <label htmlFor={id}>{label}</label>
      {type === "input" ? (
        <input
          id={id}
          value={value}
          onChange={(e) => onChange(e as React.ChangeEvent<HTMLInputElement>)}
          tabIndex={1}
          placeholder={placeholder}
        />
      ) : type === "textarea" ? (
        <textarea
          id={id}
          value={value}
          onChange={(e) =>
            onChange(e as React.ChangeEvent<HTMLTextAreaElement>)
          }
          tabIndex={1}
          placeholder={placeholder}
        />
      ) : null}
    </span>
  );
}

export default Input;
