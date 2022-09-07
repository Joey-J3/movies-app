import { useToggle } from "@/hooks";
import { OptionType } from "@/types";
import clsx from "clsx";
import React, { useEffect, useState } from "react";
import dropdownStyle from "./drop-down.module.scss";
import DropDownList, { DropDownListItem } from "./DropDownList";

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

type valueTypeMap<Multi extends boolean, B> = Multi extends true ? Array<B> : B;

function Dropdown<T extends boolean>({
  value: values,
  onChange,
  multiple = false,
  options,
  className,
  placeholder,
}: DropdownProps<T>) {
  const [currentOptions, setCurrentOptions] =
    useState<valueTypeMap<typeof multiple, OptionType>>();
  const { value: isOpen, toggle, setValue: setIsOpen } = useToggle(false);

  useEffect(() => {
    if (!multiple) {
      setCurrentOptions(options.find((o) => o.value === values));
    } else {
      setCurrentOptions(
        (values as [])
          .map((v) => options.find((o) => o.value === v))
          .filter((o) => o)
      );
    }
  }, [values]);

  const displayValue = !multiple
    ? (currentOptions as OptionType)?.label || ""
    : ((currentOptions as Array<OptionType>) || [])
        .map((o) => o.label)
        .join(", ");

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
        const selectedOps = (currentOptions as Array<OptionType>) || [];
        const index = selectedOps.findIndex((o) => o.value === selectedOps);
        if (index > -1) {
          selectedOps.splice(index, 1);
        } else {
          selectedOps.push(option);
        }
        setCurrentOptions(selectedOps);
        onChange(selectedOps, e);
      }
    }
  }

  const isSelected = (option: OptionType) => {
    if (!multiple) {
      return option.value === (currentOptions as OptionType)?.value;
    } else {
      const selectedOps = (currentOptions as Array<OptionType>) || [];
      const index = selectedOps.findIndex((o) => o.value === option.value);

      return index > -1;
    }
  };

  return (
    <div
      data-testid="drop-down"
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
