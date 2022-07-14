import React from "react";
import { OptionType } from "@/types";
import tabsStyle from "./tabs.module.scss";

interface TabsInterface {
  value: any;
  tabs: Array<OptionType>;
  onClickTab: (
    value: string,
    e: React.MouseEvent<HTMLDivElement, MouseEvent>
  ) => void;
  // sortOptions?: Array<OptionType>;
}

function Tabs({ value, tabs, onClickTab }: TabsInterface) {
  return (
    <div className={tabsStyle["tab"]}>
      {tabs.map((tab, i) => (
        <div
          key={i}
          className={`${tabsStyle["tab-item"]} text-uppercase ${
            tab.value === value && tabsStyle["tab-item--active"]
          }`}
          tabIndex={1}
          onClick={(e) => onClickTab(tab.value, e)}
        >
          {tab.label}
        </div>
      ))}
    </div>
  );
}

export default Tabs;
