import React from "react";
import dropdownStyle from "./drop-down.module.scss";

interface ListItemProps {
  children: React.ReactNode;
  onClick: React.MouseEventHandler<HTMLLIElement>;
}

export const DropDownListItem = ({ children, onClick }: ListItemProps) => (
  <li className={dropdownStyle["drop-down__list-item"]} onClick={onClick}>
    {children}
  </li>
);

function DropDownList({ children }: { children: React.ReactNode }) {
  return <ul className={dropdownStyle["drop-down__list"]}>{children}</ul>;
}

export default DropDownList;
