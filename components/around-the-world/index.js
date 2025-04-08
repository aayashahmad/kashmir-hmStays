import classNames from "classnames";
import React from "react";
import classes from "../around-the-world/index.module.less";
import ImageWithFallback from "../image-with-fallback";

const AroundWorld = () => {
  return (
    <div className={classNames(classes.aroundworld_parent)}>
      <ImageWithFallback
        src="/images/back67.png"
        alt="loding.."
        height={200}
        width={2000}
      />
      <div className={classNames(classes.aroundworld_overly)}>
        <div className={classNames(classes.aroundworld_overly1)}>
          <span className={classNames(classes.aroundworld_text1)}>12,000+</span>
          <span className={classNames(classes.aroundworld_text2)}>
            Activities
          </span>
          <span className={classNames(classes.aroundworld_text3)}>
            ALL AROUND THE WORLD
          </span>
        </div>
        <div className={classNames(classes.aroundworld_overly2)}>
          <span className={classNames(classes.aroundworld_text1)}>
            1Million+
          </span>
          <span className={classNames(classes.aroundworld_text2)}>
            Experiences
          </span>
          <span className={classNames(classes.aroundworld_text3)}>
            PER YEAR
          </span>
        </div>
      </div>
    </div>
  );
};

export default AroundWorld;
