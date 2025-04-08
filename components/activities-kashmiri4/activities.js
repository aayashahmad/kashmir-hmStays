import React, { useState } from "react";
import classNames from "classnames";
import classes from "../activities-kashmiri4/activities.module.less";
import ImageWithFallback from "../image-with-fallback";
const ActivitiesKashmiri = () => {
  const [activities, setactivities] = useState([
    { id: 1, h1: "12000+", b1: "ACTIVITIES" },
    { id: 2, h1: "125+", b1: "DESTINATIONS" },
    { id: 3, h1: "5000+", b1: "SUPPLIERS" },
    { id: 4, h1: "3.5M+", b1: "USERS/MONTH" },
  ]);
  return (
    <div className={classNames(classes.activitiesaashmiri_parent)}>
      <ImageWithFallback
        src="/images/sw.jpg"
        alt=""
        height={200}
        width={2000}
      />
      <div className={classNames(classes.activitiesaashmiri_overly)}>
        <div className={classNames(classes.activitiesaashmiri_overly_head)}>
          <span>
            We are{" "}
            <span
              className={classNames(classes.activitiesaashmiri_overly_head_sp)}
            >
              Kashmir HomeStays
            </span>
          </span>
        </div>
        <div className={classNames(classes.activitiesaashmiri_overly_text)}>
          {activities?.map((items) => {
            return (
              <div
                className={classNames(classes.activitiesaashmiri_overly_text1)}
              >
                <span className={classNames(classes.h1)}>{items.h1}</span>
                <span className={classNames(classes.b1)}>{items.b1}</span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default ActivitiesKashmiri;
