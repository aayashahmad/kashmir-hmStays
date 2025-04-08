import "react-alice-carousel/lib/alice-carousel.css";
import React, { useEffect, useState } from "react";
import AliceCarousel from "react-alice-carousel";
import classNames from "classnames";
import classes from "./home-destinations.module.less";
import { useRouter } from "next/router";
import { callApi } from "../../services/api/callApi";
import { selectedLocationState } from "../../recoil/atoms/common";
import { useSetRecoilState } from "recoil";
import CustomHead from "../head";
import LeftHighlightedTitle from "../left-highlighted-title";

const TopHomeDestinations = () => {

  const router = useRouter();

  const [items, setItems] = useState([]);
  const setSelectedLocation = useSetRecoilState(selectedLocationState)

  const responsive = {
    1024: { items: 4 },
    900: { items: 3 },
    800: { items: 3 },
    700: { items: 3 },
    600: { items: 3 },
    500: { items: 2 },
    400: { items: 1 },
    300: { items: 1 },
    200: { items: 1 },
    100: { items: 1 },
  };

  useEffect(() => {
    callApi({
      endPoint: "destinations/",
      method: "GET",
      callback: (result) => {
        if (result?.data?.data) {
          setItems(result?.data?.data)
        }
      },
    });
  }, []);


  const gotoSearchResults = (dest) => {

    setSelectedLocation(dest)

    router.push(`/destinations/${dest.name}`)

  }

  const ImageItem = ({ item, index }) => {
    return (
      <a
        className={classes.home_destination_item}
        key={index}
        href={item.link}
        target={item.newTabLink ? "_blank" : ""}
        onClick={() => gotoSearchResults(item)}
      >
        {selectedLocationState && 
        <CustomHead
          metaTitle={selectedLocationState?.meta_title}
          metaDescription={selectedLocationState?.meta_description} 
          ogTitle={selectedLocationState?.meta_title}
          ogDescription={selectedLocationState?.meta_description} 
        />
        }
        <div className={classes.home_destination_img}>
          <img
            className={classes.normal}
            src={item?.image?.url}
          />
          <div className={classes.title}>
            <span className={classes.title_container}>{item.name}</span>
          </div>
          <div className={classes.text_hover}>
            <div>
              <div
                className={classNames({
                  "bold-text": true,
                  [classes.title_hover]: true,
                })}
              >
                {item.description}
              
              </div>
              <div className="font11">{item.textHover}</div>
            </div>
          </div>

          <div className={classes.best_seller}>
            <div className={classes.best_seller_text}>
              <span>Best Seller</span>
            </div>
          </div>
        </div>
      </a>
    );
  };

  return (
    <div className={classes.home_services_main}>
      <div className="content-container">

        {items && <LeftHighlightedTitle title={"Top Destinations in Kashmir"}/>}
        <div className={classes.home_services_body}>
          <AliceCarousel
            responsive={responsive}
            infinite
            disableDotsControls={false}
            disableButtonsControls
            autoPlay={true}
            animationDuration={1500}
            items={items?.map((item, index) => {
              return <ImageItem item={item} index={index} />;
            })}
          />
        </div>
      </div>
    </div>
  );
};




export default TopHomeDestinations;
