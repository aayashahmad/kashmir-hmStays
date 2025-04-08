import classes from "./activities-home.module.less";
import ContentContainer from "../content-container/content-container";
import { ArrowCircleRight } from "@mui/icons-material";
import ImageWithFallback from "../image-with-fallback";
import { callApi } from "../../services/api/callApi";
import { useEffect, useState } from "react";

const ActivitiesHome = ({ router }) => {
  const [latestActivities, setLatestActivities] = useState([]);
  useEffect(() => {
    callApi({
      endPoint: "/activities",
      method: "GET",
      callback: (res) => {
        if (res?.data?.data?.length > 1) {
          console.log(res.data.data.slice(-3), "res from activities api");
          setLatestActivities(res?.data?.data.splice(-3));
        } else {
          console.log("activities error");
        }
      },
    });
  }, []);

  const gotoActivities = () => {
    router.push("/activities");
  };
  return (
<div className={classes.backgroundcolor}>
<ContentContainer>
      {latestActivities?.length && (
        <div className={classes.activities_home} onClick={gotoActivities}>
          <div className={classes.left_spotlight_wrapper}>
            <div className={classes.feature_image}>
              <ImageWithFallback
                src={latestActivities[0]?.image?.url}
                alt="feature_image"
                width={500}
                height={800}
                style={{ cursor: "pointer" }}
              />
            </div>

            <div className={classes.spotlight_item_action_wrapper + " font10"}>
              <span> {latestActivities[0]?.name}</span>
              <ArrowCircleRight className={classes.arrow_icon} />
            </div>
          </div>
          <div className={classes.more_highlights}>
            <div className={classes.more_highlights_inner}>
              <div className={classes.more_highlights_title + " font20"}>
                DISCOVER AND ENJOY NEW PLACES AND EXPERIENCES
              </div>
              <div className={classes.more_highlights_description + " font14"}>
                Man cannot discover new oceans unless he has the courage to lose
                sight of the shoreline.
              </div>
            </div>

            <div className={classes.more_spotlights}>
              {latestActivities?.map((activity, index) => {
                if (index != 1 && index != 2) return;

                return (
                  <div
                    className={classes.spotlight_item}
                    style={{ cursor: "pointer" }}
                  >
                    <ImageWithFallback
                      src={activity?.image?.url}
                      alt="spotlight"
                      width={500}
                      height={500}
                    />
                    <div
                      className={
                        classes.spotlight_item_action_wrapper + " font10"
                      }
                    >
                      <span className={classes.title}>
                        {activity?.name?.split(" ").slice(0, 6).join(" ") +
                          " ..."}
                      </span>
                      <ArrowCircleRight className={classes.arrow_icon} />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}
    </ContentContainer>
</div>
  );
};

export default ActivitiesHome;
