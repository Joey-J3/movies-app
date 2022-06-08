import clsx from "clsx";
import React, { useState } from "react";
import dropdownStyle from "./drop-down.module.scss";
import DropDownList, { DropDownListItem } from "./DropDownList";

export type OptionType = { label: string; value: string | number };

interface DropdownProps<Multi extends boolean> {
  value: valueTypeMap<Multi, string | number>;
  options: Array<OptionType>;
  multiple?: boolean;
  onChange?: (
    value: OptionType | Array<OptionType>,
    e: React.MouseEvent<HTMLLIElement, MouseEvent>
  ) => any;
  className?: string;
  placeholder?: string;
}

type valueTypeMap<Multi extends boolean, T> = Multi extends true ? Array<T> : T;

function Dropdown<T extends boolean>({
  value,
  onChange,
  multiple = false,
  options,
  className,
  placeholder,
}: DropdownProps<T>) {
  const [currentOptions, setCurrentOptions] =
    useState<valueTypeMap<typeof multiple, OptionType>>();
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const displayValue = !multiple
    ? (currentOptions as OptionType)?.label || ""
    : ((currentOptions as Array<OptionType>) || [])
        .map((o) => o.label)
        .join(",");

  const toggle = () => setIsOpen(!isOpen);

  function onOptionClick(
    option: OptionType,
    e: React.MouseEvent<HTMLLIElement, MouseEvent>
  ) {
    if (option) {
      if (!multiple) {
        setCurrentOptions(option);
        setIsOpen(false);
        onChange(option, e);
      } else {
        const values = (currentOptions as Array<OptionType>) || [];
        const index = values.findIndex((o) => o.value === value);
        if (index > -1) {
          values.splice(index, 1);
        } else {
          values.push(option);
        }
        setCurrentOptions(values);
        onChange(values, e);
      }
    }
  }

  const isSelected = (option: OptionType) => {
    if (!multiple) {
      return option.value === (currentOptions as OptionType)?.value;
    } else {
      const values = (currentOptions as Array<OptionType>) || [];
      const index = values.findIndex((o) => o.value === option.value);

      return index > -1;
    }
  };

  return (
    <div
      className={`${dropdownStyle["drop-down"]} ${className || ""}`}
      tabIndex={1}
      onBlur={() => setIsOpen(false)}
    >
      <div className={dropdownStyle["drop-down__header"]} onClick={toggle}>
        {displayValue || <span className="placeholder">{placeholder}</span>}
      </div>
      <div
        className={clsx(dropdownStyle["drop-down__icon"], {
          [`${dropdownStyle["drop-down__icon--active"]}`]: isOpen,
        })}
        onClick={toggle}
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
                isActive={isSelected(option)}
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
