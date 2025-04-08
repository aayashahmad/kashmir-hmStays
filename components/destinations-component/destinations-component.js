import classNames from "classnames";
import React, { useEffect, useState } from "react";
import classes from "./destinations.module.less";
import { callApi } from "../../services/api/callApi";
import { useSetRecoilState } from "recoil";
import { selectedLocationState } from "../../recoil/atoms/common";
import LeftHighlightedTitle from "../left-highlighted-title";
import ImageWithFallback from "../image-with-fallback";
import { Button } from "@mui/material";

const DestinationsComponent = ({ router, item }) => {
  const [destinations, setDestinations] = useState([]);
  const [showFullDescription, setShowFullDescription] = useState(false);

  //recoil states

  const setSelectedLocation = useSetRecoilState(selectedLocationState);

  useEffect(() => {
    callApi({
      endPoint: `destinations`,
      method: "GET",
      callback: (result) => {
        if (result?.status === 200) {
          setDestinations(result.data.data);
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
    <div className={classNames(classes.destinations_parent)}>
      <LeftHighlightedTitle title={"Top Tourist Destinations"} />
      <div className={classNames(classes.destinations_places)}>
        {destinations?.map((item) => {
          return (
            <div
              className={classNames(classes.destinations_inner_places)}
            >
              <div className={classNames(classes.destinations_place_image)} onClick={() => gotoSearchResults(item)} >
                <ImageWithFallback
                  src={item?.image?.url}
                  alt="loding"
                  height={1000}
                  width={1000}
                  
                />
                
              </div>
              <div className={classNames(classes.destinations_place_text)}>
                <span
                  className={classNames(classes.destinations_place_text_title)}
                  dangerouslySetInnerHTML={{ __html: item.name }}
                ></span>
                <span
                  className={classNames(classes.destinations_place_text_desc)}
                  dangerouslySetInnerHTML={{
                    __html: showFullDescription
                      ? item.description
                      : item.description.substring(0, 88) + "....",
                  }}
                ></span>
                <div>
                  <Button
                    onClick={() => setShowFullDescription(!showFullDescription)}
                  >
                    {showFullDescription ? "show less" : "show more"}
                  </Button>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default DestinationsComponent;
