import "react-alice-carousel/lib/alice-carousel.css";
import AliceCarousel from "react-alice-carousel";
import classNames from "classnames";
import classes from "./tour-packages.module.less";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { callApi } from "../../services/api/callApi";

const TourPackages = ({ title, description }) => {
  const [packages, setPackages] = useState([]);

  // use effects
  useEffect(() => {
    callApi({
      endPoint: "packages",
      method: "GET",
      callback: (result) => {
        if (result?.status === 200) {
          if (result?.data?.packages?.length > 0) {
            setPackages(result?.data?.packages);
          }
          packages;
        } else {
          console.log("error");
        }
      },
    });
  }, []);

  const responsive = {
    400: { items: 1 },
    414: { items: 1 },
    430: { items: 1 },
    568: { items: 2 },
    900: { items: 3 },
  };

  return (
    <div className={classes.home_services_main}>
      <div className="content-container">
        <div className={classes.home_services_head}>
          <div
            className={classNames({
              [classes.home_services_text]: true,
              "primary-text": true,
              "bold-text": true,
            })}
          >
            {title}
          </div>
          <span className={classes.description}>{description}</span>
        </div>
        <div className={classes.home_services_body}>
          <AliceCarousel
            responsive={responsive}
            infinite
            disableDotsControls={true}
            disableButtonsControls
            autoPlay={true}
            animationDuration={1500}
            items={packages?.map((item, index) => {
              return <ImageItem item={item} index={index} />;
            })}
          />
        </div>
      </div>
    </div>
  );
};

const ImageItem = ({ item, index }) => {
  const router = useRouter();
  return (
    <div
      className={classes.home_destination_item}
      key={index}
      onClick={() => router.push(item.link)}
      href={item.link}
      target={item.newTabLink ? "_blank" : ""}
    >
      <div className={classes.home_destination_img}>
        <img src={item.image} alt="" />

        <div className={classes.durate}>
          <div className={classes.duration}>
            <span>{item.duration}</span>
          </div>

          <div className={classes.rating}>
            <span>{item.rating}</span>
          </div>
        </div>

        <div className={classes.title}>
          <span>{item.name}</span>
        </div>

        <span className={classes.offer}>{item.discount}</span>

        <div className={classes.price}>{item.price}</div>
        <div className={classes.icons}>
          <a href="tel:+9170060522604" class={classes.callIcon}>
            <span>Call Now</span>
          </a>
          <div className={classes.requestIcon}>
            <span>Request callback</span>
          </div>
        </div>
      </div>
    </div>
  );
};
export default TourPackages;
