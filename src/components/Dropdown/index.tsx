import React, { useState } from "react";
import dropdownStyle from "./drop-down.module.scss";
import DropDownList, { DropDownListItem } from "./DropDownList";

export type OptionType = { label: string; value: string | number };

interface DropdownProps {
  value: OptionType;
  options: Array<OptionType>;
  onChange?: (
    value: OptionType,
    e: React.MouseEvent<HTMLLIElement, MouseEvent>
  ) => any;
  className?: string;
  placeholder?: string;
}

function Dropdown({
  value,
  onChange,
  options,
  className,
  placeholder,
}: DropdownProps) {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const toggle = () => setIsOpen(!isOpen);

  function onOptionClick(
    option: OptionType,
    e: React.MouseEvent<HTMLLIElement, MouseEvent>
  ) {
    setIsOpen(false);
    onChange(option, e);
  }
  return (
    <div
      className={`${dropdownStyle["drop-down"]} ${className || ""}`}
      tabIndex={1}
      onClick={toggle}
      onBlur={() => setIsOpen(false)}
    >
      <div className={dropdownStyle["drop-down__header"]}>
        {value?.label ? (
          value.label
        ) : (
          <span className="placeholder">{placeholder}</span>
        )}
      </div>
      <div
        className={`${dropdownStyle["drop-down__icon"]} ${
          isOpen ? dropdownStyle["drop-down__icon--active"] : ""
        }`}
      >
        <span className="material-icons md-18">expand_more</span>
      </div>
      {isOpen && (
        <div className={dropdownStyle["drop-down__list__wrapper"]}>
          <DropDownList>
            {options.map((option) => (
              <DropDownListItem
                onClick={(e) => onOptionClick(option, e)}
                key={option.value}
              >
                {option.label}
              </DropDownListItem>
            ))}
          </DropDownList>
        </div>
      )}
    </div>
  );
}

export default Dropdown;
