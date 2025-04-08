import classNames from "classnames";
import classes from "./activity-item.module.less";
import { selectedActivityState } from "../../recoil/atoms/common";
import { useSetRecoilState } from "recoil";
import ImageWithFallback from "../image-with-fallback";
import { Button } from "@mui/material";
import { useState } from "react";

const ActivityItem = ({ activity, router }) => {
  //recoil states
  const setSelectedActivity = useSetRecoilState(selectedActivityState);
  const [showFullDescription, setShowFullDescription] = useState(false);

  const gotoPackDetails = (item) => {
    setSelectedActivity(item);
    router.push("/activities/" + item.name);
  };

  return (
    <div className={classNames(classes.honeymoon_inner_parent_body)}>
      <div
        className={classes.clickable_item}
        onClick={() => gotoPackDetails(activity)}
      >
        <div className={classNames(classes.honeymoon_inner_parent_body_img)}>
          <ImageWithFallback
            src={activity?.image?.url}
            alt=""
            width={500}
            height={500}
          />
        </div>

        <div
          className={classNames(classes.honeymoon_inner_parent_body_stars)}
        ></div>
        <div className={classes.title}>
          <span className="bold-text font12">{activity.name}</span>
        </div>


        <div className={classNames(classes.desc)}>
          <span
            className="font11"
            dangerouslySetInnerHTML={{ __html: showFullDescription
              ? activity.description
              : activity.description.substring(0, 100 ) + "...."
             }}
          ></span>
        </div>
      </div>
      <Button
      onClick={()=>setShowFullDescription(!showFullDescription)}
      >
        {showFullDescription ? "show less" : "show more"}
      </Button>
    </div>
  );
};

export default ActivityItem;
