import React, { useState } from "react";
import tabsStyle from "./tabs.module.scss";

interface TabsInterface {
  tabs: Array<any>;
  onClickTab: (
    tab: any,
    e: React.MouseEvent<HTMLDivElement, MouseEvent>
  ) => void;
  // sortOptions?: Array<OptionType>;
}

function Tabs({ tabs, onClickTab }: TabsInterface) {
  const [currentTabIndex, setcurrentTab] = useState(0);
  const onClickTabFunc = (
    tab: any,
    index: number,
    e: React.MouseEvent<HTMLDivElement, MouseEvent>
  ) => {
    setcurrentTab(index);
    onClickTab(tab, e);
  };
  return (
    <div className={tabsStyle["tab"]}>
      {tabs.map((tab, i) => (
        <div
          key={i}
          className={`${tabsStyle["tab-item"]} text-uppercase ${
            i === currentTabIndex && tabsStyle["tab-item--active"]
          }`}
          tabIndex={1}
          onClick={(e) => onClickTabFunc(tab, i, e)}
        >
          {tab}
        </div>
      ))}
    </div>
  );
}

export default Tabs;
