import React from "react";
import classNames from "classnames";
import classes from "../inside-package/inside-package.module.less";
import { Check, Close } from "@mui/icons-material";

const ItemList = ({ items, isExclusion }) => (
  <div className={isExclusion ? classes.right : classes.left}>
    <div className={classes.title}>
      {isExclusion ? "Exclusions" : "Inclusions"}
    </div>
    {items?.map((item, index) => (
      <div
        key={index}
        className={isExclusion ? classes.right_inner : classes.left_inner}
      >
        <div>{isExclusion ? <Close fontSize="30" /> : <Check />}</div>
        <div className={classes[isExclusion ? "right_text" : "left_text"]}>
          {item}
        </div>
      </div>
    ))}
  </div>
);

const InsidePackage = ({ inclusions, exclusions }) => {
  return (
    <div className={classNames(classes.package_parent_wrapper, "card")}>
      <div className={classes.package_parent_heading}>
        <span style={{ fontSize: "14pt" }}>What’s inside the package?</span>
      </div>
      <div className={classes.package_parent_body}>
        <ItemList items={inclusions} isExclusion={false} />
        <ItemList items={exclusions} isExclusion={true} />
      </div>
    </div>
  );
};

export default InsidePackage;
