import classNames from "classnames";
import { useRouter } from "next/router";
import { useRecoilState } from "recoil";
import ContentContainer from "../content-container/content-container";
import classes from "./index.module.less";
import { selectedCarState } from "../../recoil/atoms/common";
import DirectionsCarIcon from "@mui/icons-material/DirectionsCar";
import CurrencyRupeeIcon from "@mui/icons-material/CurrencyRupee";
import LocalGasStationIcon from "@mui/icons-material/LocalGasStation";
import LeftHighlightedTitle from "../left-highlighted-title";
import ImageWithFallback from "../image-with-fallback";

const CarPackages = ({ data }) => {
  const [selectedCar, setSelectedCar] = useRecoilState(selectedCarState);
  const router = useRouter();

  console.log("selected car : ", { selectedCar });

  const gotoCarsDetails = (item) => {
    setSelectedCar(item);
    router.push("/cars-details");
  };

  return (
    <ContentContainer>
      <LeftHighlightedTitle title={"Rent Cars"} />
      <div className={classNames(classes.hotels_parent_body)}>
        {data?.map((item, index) => (
          <div
            className={classNames(classes.hotels_inner_parent_body)}
            key={index}
            onClick={() => gotoCarsDetails(item)}
          >
            <div className={classNames(classes.hotels_inner_parent_body_img)}>
              <ImageWithFallback
                src={item?.image?.url}
                alt="loading"
                height={1000}
                width={1000}
              />
            </div>
            <div className={classNames(classes.hotels_inner_parent_body_stars)}>
              <div className={classNames(classes.stars_one)}>
                <span>{item?.name}</span>
              </div>
              <div className={classNames(classes.stars_two)}>
                <span
                  dangerouslySetInnerHTML={{
                    __html: item?.description.split(".")[0],
                  }}
                ></span>
              </div>
            </div>
            <div className={classNames(classes.hotels_inner_parent_body_price)}>
              <span className={classes.currency_per_day_rate}>
                {" "}
                <CurrencyRupeeIcon /> {item?.per_day_rate}/Day
              </span>
              <span>
                <CurrencyRupeeIcon /> {item?.per_hour_rate}/Hour
              </span>
            </div>
            <div className={classNames(classes.activities_container)}>
              <span>
                <LocalGasStationIcon /> {item?.fuel}
              </span>
              <span>{item?.type}</span>
            </div>

            <div className={classes.discount}>
              <span>
                {item?.discount_type === "amount" ? (
                  <CurrencyRupeeIcon />
                ) : null}
                {item && item.discount_type === "percentage"
                  ? item.discount + " %"
                  : item.discount}
              </span>
            </div>
            <div className={classNames(classes.book_now)}>
              <span>
                Book Now <DirectionsCarIcon />
              </span>
            </div>
          </div>
        ))}
      </div>
    </ContentContainer>
  );
};

export default CarPackages;
