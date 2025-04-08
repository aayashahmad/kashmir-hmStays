import Image from "next/image";
import classes from "./hero-wrapper.module.less";
import { useSetRecoilState } from "recoil";
import { customPackageModalState } from "../../recoil/atoms/common";
import ImageWithFallback from "../image-with-fallback";

const PackageHeroComponent = ({
  image,
  title,
  discount,
  location,
  rate,
  imageResponsive = false,
}) => {
  const setcustomPackageModal = useSetRecoilState(customPackageModalState);

  const openRequestModal = () => {
    setcustomPackageModal(true);
  };

  return (
    <div className={classes.hero_wrapper}>
      <ImageWithFallback
        className="background_img"
        src={image ? image : "/images/ella-de-kross-6HHuEhgUXK0-unsplash.webp"}
        alt="hero"
        width={1600}
        height={800}
        style={imageResponsive ? { objectFit: "cover" } : {}}
      />
      <div className={classes.overlay_data}>
        <div className={classes.overlay_data_upper_content}>
          <div className={classes.upper_content_heading}>{title}</div>
          {discount !== 0 && (
            <div className={classes.upper_content_description}>
              Get up to
              <div className={classes.special_text_one}>{discount}% off </div>
              on {location} packages
            </div>
          )}
        </div>
        <div className={classes.middle_white_line}></div>
        <div className={classes.overlay_data_bottom_content}>
          <div className={classes.bottom_heading}>Package Starting from</div>
          <div className={classes.bottom_description}>
            {rate !== Infinity && rate !== 0 && (
              <div className={classes.price_container}>INR {rate}</div>
            )}

            <div className={classes.bottom_time_container}>Ends in 4 days</div>
          </div>
          <div
            className={classes.bottom_button_container}
            onClick={openRequestModal}
          >
            <button>Get Quotes Instantly!</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PackageHeroComponent;
