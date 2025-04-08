import "react-alice-carousel/lib/alice-carousel.css";
import React, { useState } from "react";
import AliceCarousel from "react-alice-carousel";
import classes from "./carousel.module.less";
import PackageItem from "../package-item";
import { ArrowLeft, ArrowRight, Close, TurnLeft } from "@mui/icons-material";

const PacksCarousel = ({ items, router }) => {
  const responsive = {
    0: { items: 1 },
    568: { items: 2 },
    1024: { items: 3 },
    1320: { items: 3 },
  };

  const handleSwipeLeft = () => {};
  const handleSwipeRight = () => {};

  return (
    <div className={classes.home_services_main}>
      <div className="content-container">
        <div className={classes.home_services_body}>
          <AliceCarousel
            responsive={responsive}
            autoPlay={false}
            showArrows={true}
            swipeable
            showButtons={false}
            showIndicators={false}
            items={items?.map((item, index) => {
              return <PackageItem pack={item} />;
            })}
            renderPrevButton={() => (
              <ArrowLeft style={{ fontSize: 50, color: "white" }} />
            )}
            renderNextButton={() => (
              <ArrowRight style={{ fontSize: 50, color: "white" }} />
            )}
          />
        </div>
      </div>
    </div>
  );
};

export default PacksCarousel;
