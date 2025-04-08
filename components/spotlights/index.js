import { useEffect, useState } from "react";
import { callApi } from "../../services/api/callApi";
import FancyTitle from "../fancy-title";
import ContentContainer from "../content-container/content-container";
import { useRouter } from "next/router";
import { selectedLocationState } from "../../recoil/atoms/common";
import { useSetRecoilState } from "recoil";

const Spotlights = () => {
  const router = useRouter();

  const [spotlights, setSpotlights] = useState([]);
  const setSelectedLocation = useSetRecoilState(selectedLocationState);

  useEffect(() => {
    callApi({
      endPoint: "splotlights",
      method: "GET",
      callback: (result) => {
        if (result?.status === 200) {
          setSpotlights(result.data?.data?.slice(0, 3));
        } else {
          console.log("error");
        }
      },
    });
  }, []);

  const gotoSearchResults = (dest) => {
    setSelectedLocation(dest);

    router.push(`/destinations/${dest.name}`);
  };

  return (
    <ContentContainer>
      <div className="spotlight_wrapper">
        {spotlights && (
          <div className="spotlight_intro">
            <FancyTitle title={"Find The Perfect Escape"} />
            <div className="sub_title cursive_text font16">
              Discover your ideal Experience
            </div>
          </div>
        )}

        <div className="images_container">
          {spotlights?.map((item, key) => {
            return (
              <div
                key={key}
                className="img_wrapper"
                onClick={() => gotoSearchResults(item)}
              >
                <img src={item?.image?.url} alt="An image here" />
                <div className="main_overlay">
                  <span className="font20 title bold-text cursive_text">
                    {item.name}
                  </span>
                  <span className="font13 subtitle bold-text ">
                    {item.description}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </ContentContainer>
  );
};

export default Spotlights;
