import clsx from "clsx";
import React from "react";
import dropdownStyle from "./drop-down.module.scss";

interface ListItemProps {
  children: React.ReactNode;
  onClick: React.MouseEventHandler<HTMLLIElement>;
  isActive?: boolean;
}

export const DropDownListItem = ({
  children,
  onClick,
  isActive,
}: ListItemProps) => (
  <li
    className={clsx(dropdownStyle["drop-down__list-item"], {
      [`${dropdownStyle["drop-down__list-item--active"]}`]: isActive,
    })}
    onClick={onClick}
  >
    {children}
  </li>
);

function DropDownList({ children }: { children: React.ReactNode }) {
  return <ul className={dropdownStyle["drop-down__list"]}>{children}</ul>;
}

export default DropDownList;
