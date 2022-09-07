import React from "react";
import inputStyle from "./input.module.scss";

interface InputInterface {
  placeholder?: string;
  name?: string;
  value: string | number | readonly string[];
  onChange: React.ChangeEventHandler<HTMLInputElement | HTMLTextAreaElement>;
  inputType?: React.HTMLInputTypeAttribute;
  type?: "input" | "textarea";
}

function Input({
  placeholder,
  name,
  value,
  onChange,
  inputType = "text",
  type = "input",
}: InputInterface) {
  return (
    <span className={inputStyle["input-field"]}>
      {type === "input" ? (
        <input
          id={name}
          name={name}
          value={value}
          onChange={(e) => onChange(e as React.ChangeEvent<HTMLInputElement>)}
          type={inputType}
          tabIndex={1}
          placeholder={placeholder}
        />
      ) : type === "textarea" ? (
        <textarea
          id={name}
          name={name}
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
