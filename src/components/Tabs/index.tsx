import React, { useState } from "react";
import Dropdown, { OptionType } from "../Dropdown";
import tabsStyle from "./tabs.module.scss";

interface TabsInterface {
  tabs: Array<any>;
  onClickTab: (
    tab: any,
    e: React.MouseEvent<HTMLDivElement, MouseEvent>
  ) => void;
  // sortOptions?: Array<OptionType>;
}

const mockSortType = [
  {
    label: "release date",
    value: "release date",
  },
  {
    label: "name",
    value: "name",
  },
];

function Tabs({ tabs, onClickTab }: TabsInterface) {
  const [currentTabIndex, setcurrentTab] = useState(0);
  const [curSortType, setcurSortType] = useState<OptionType>(mockSortType[0]);
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
      <div className={tabsStyle["tab-box"]}>
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
      <div className={tabsStyle["tab__filter"]}>
        <p className="text-uppercase">sort by</p>
        <Dropdown
          value={curSortType}
          onChange={(o) => setcurSortType(o)}
          options={mockSortType}
          className={tabsStyle["tab__selector"]}
        />
      </div>
    </div>
  );
}

export default Tabs;
