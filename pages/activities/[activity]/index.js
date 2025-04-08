import MainWrapper from "../../../components/wrapper/wrapper";
import ContentContainer from "../../../components/content-container/content-container";
import { useRouter } from "next/router";
import classes from "./activity-details.module.less";
import { selectedActivityState } from "../../../recoil/atoms/common";
import { useRecoilValue } from "recoil";
import HomeBlogShowcase from "../../../components/home-blog-showcase/home-blog-showcase";
import MorePackages from "../../../components/more-packages";
import LeftHighlightedTitle from "../../../components/left-highlighted-title";
import ImageWithFallback from "../../../components/image-with-fallback";

const Activities = () => {
  const router = useRouter();

  const selectedActivity = useRecoilValue(selectedActivityState);

  return (
    <MainWrapper headerAbsolute={true} headerFixed={false} smallHeader={true}>
      {selectedActivity && (
        <ContentContainer>
          <div className={classes.activity_wrapper}>
            <ImageWithFallback
              className={classes.activity_image}
              src={selectedActivity?.image?.url}
              alt={selectedActivity?.destination}
              width={500}
              height={500}
            />
            <LeftHighlightedTitle title={selectedActivity?.name} />
            <div className={classes.location}>
              {selectedActivity?.destination}
            </div>
            <div
              className={classes.activity_description}
              style={{ marginTop: "16px" }}
              dangerouslySetInnerHTML={{
                __html: selectedActivity?.description,
              }}
            />
          </div>
        </ContentContainer>
      )}

      <MorePackages
        router={router}
        title={`Top Packages in ${selectedActivity?.name}`}
      />

      <HomeBlogShowcase />
    </MainWrapper>
  );
};

export default Activities;
