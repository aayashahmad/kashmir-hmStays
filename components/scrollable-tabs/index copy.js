import React, { useRef } from "react";
import classes from "./index.module.less";
import classNames from "classnames";
import { useRecoilState } from "recoil";
import { selectedPackageTabState } from "../../recoil/atoms/common";
const ScrollableTabs = ({ tabs }) => {
  const [activeTab, setActiveTab] = useRecoilState(selectedPackageTabState);

  const scrollContainerRef = useRef(null);

  const handleTabClick = (tab) => {
    setActiveTab(tab);
  };

  const move = (direction) => {
    if (scrollContainerRef.current) {
      if (direction === "right")
        scrollContainerRef.current.scrollTo({
          left: scrollContainerRef.current.scrollLeft + 100,
          behavior: "smooth",
        });
      else
        scrollContainerRef.current.scrollTo({
          left: scrollContainerRef.current.scrollLeft - 100,
          behavior: "smooth",
        });
    }
  };

  return (
    <div className={classes.tabs_wrapper}>
      <div onClick={() => move("left")} className={classes.action_btn}>
        ❮
      </div>
      <div ref={scrollContainerRef} className={classes.tabs}>
        {tabs?.map((tab, index) => (
          <div
            key={index}
            className={
              index === activeTab.id
                ? classNames(classes.tab, classes.active)
                : classes.tab
            }
            onClick={() => handleTabClick(tab)}
          >
            {tab.title}
          </div>
        ))}
      </div>
      <div onClick={() => move("right")} className={classes.action_btn}>
        ❯
      </div>
    </div>
  );
};

export default ScrollableTabs;
