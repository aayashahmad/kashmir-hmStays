import "react-alice-carousel/lib/alice-carousel.css";
import classes from "./tourism-alliances.module.less";
import { useRouter } from "next/router";
import ImageWithFallback from "../image-with-fallback";

const TourismAlliances = ({ title }) => {

  return (
    <div></div>
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
        <ImageWithFallback
          className={classes.normal}
          src={item.image}
          alt="An image here"
          width={80}
          height={80}
        />
      </div>
    </div>
  );
};

export default TourismAlliances;
