import React, { useState } from "react";
import classes from "./hidden-data.module.less";
import LeftHighlightedTitle from "../left-highlighted-title";

const HiddenData = ({ data }) => {
  const [showMore, setShowMore] = useState(false);

  const ShowMore = () => {
    setShowMore(!showMore);
  };

  return (
    <div className={classes.hidden_data}>
      <LeftHighlightedTitle title={"More information"} size={10} />
      <div
        className={classes.hidden_data_dec}
        dangerouslySetInnerHTML={{
          __html: showMore ? data : data?.split(".")[0] + "...",
        }}
      ></div>
      {data?.length > 100 && (
        <button className={classes.hidden_data_button} onClick={ShowMore}>
          {showMore ? "Show Less" : "Show More"}
        </button>
      )}
    </div>
  );
};

export default HiddenData;
