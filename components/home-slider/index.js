import "react-slideshow-image/dist/styles.css";
import React, { useEffect, useState } from "react";
import { Fade } from "react-slideshow-image";
import { callApi } from "../../services/api/callApi";

const HomeSlider = (props) => {
  const [banners, setBanners] = useState([]);

  // use effects
  useEffect(() => {
    callApi({
      endPoint: "sliders",
      method: "GET",
      callback: (result) => {
        if (result?.status === 200) {
          if (result?.data?.data?.length > 0) {
            setBanners(result?.data?.data?.filter((it) => it.image != null));
          }
        } else {
          console.log("error");
        }
      },
    });
  }, []);

  const fadeProperties = {
    duration: 5000,
    pauseOnHover: false,
    autoplay: true,
    prevArrow: (
      <button className="home-banner-prevArrow">
        <img
          className="home-banner-arrow"
          src="/images/HomeBanner/Home-LeftArrow.svg"
          alt=""
        />
      </button>
    ),
    nextArrow: (
      <button className="home-banner-nextArrow">
        <img
          className="home-banner-arrow"
          src="/images/HomeBanner/Home-RightArrow.svg"
          alt=""
        />
      </button>
    ),
  };


  return (
    <div className="home-banner">
      <Fade {...fadeProperties} arrows={false}>
        {banners.map(
          (fadeImage, index) =>
            fadeImage.image && (
              <div className="each-fade" key={index}>
                <div className="image-container">
                  <img
                    src={fadeImage?.image?.url}
                    alt={fadeImage?.image?.alt}
                  />
                </div>
              </div>
            )
        )}
      </Fade>
    </div>
  );
};

export default HomeSlider;
