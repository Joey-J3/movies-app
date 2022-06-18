import React from "react";
import { OptionType } from "@/types";
import tabsStyle from "./tabs.module.scss";

interface TabsInterface {
  activeTab: OptionType;
  tabs: Array<OptionType>;
  onClickTab: (
    tab: any,
    e: React.MouseEvent<HTMLDivElement, MouseEvent>
  ) => void;
  // sortOptions?: Array<OptionType>;
}

function Tabs({ activeTab, tabs, onClickTab }: TabsInterface) {
  return (
    <div className={tabsStyle["tab"]}>
      {tabs.map((tab, i) => (
        <div
          key={i}
          className={`${tabsStyle["tab-item"]} text-uppercase ${
            tab.value === activeTab.value && tabsStyle["tab-item--active"]
          }`}
          tabIndex={1}
          onClick={(e) => onClickTab(tab, e)}
        >
          {tab.label}
        </div>
      ))}
    </div>
  );
}

export default Tabs;
