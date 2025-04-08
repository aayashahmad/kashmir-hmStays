import { useEffect, useState } from "react";
import MainWrapper from "../../components/wrapper/wrapper";
import { callApi } from "../../services/api/callApi";
import ContentContainer from "../../components/content-container/content-container";
import ActivityItem from "../../components/activity-item";
import { useRouter } from "next/router";
import classes from "./activities.module.less";
import BlogLine from "../../components/blog-line";
import MorePackages from "../../components/more-packages";
import LeftHighlightedTitle from "../../components/left-highlighted-title";

const Activities = () => {
  const router = useRouter();

  const [activities, setActivities] = useState([]);

  useEffect(() => {
    callApi({
      endPoint: "activities",
      method: "GET",
      callback: (result) => {
        if (result?.status === 200 && result?.data?.data?.length > 0) {
          setActivities(result.data.data);
        } else {
          console.error("Failed to fetch packages:", result);
        }
      },
    });
  }, []);
  return (
    <MainWrapper headerAbsolute={true} headerFixed={false} smallHeader={true}>
      <ContentContainer>
        <LeftHighlightedTitle title="Top activities offered by Kashmir HomeStays" />
        <div className={classes.activity_wrapper}>
          {activities &&
            activities?.map((activity, index) => (
              <ActivityItem key={index} activity={activity} router={router} />
            ))}
        </div>
        {/* <MorePackages title="Top Packages" /> */}

        <BlogLine title="Top Blogs" router={router} />
      </ContentContainer>
    </MainWrapper>
  );
};

export default Activities;
