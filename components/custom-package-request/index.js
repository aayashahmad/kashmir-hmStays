import { useSetRecoilState } from "recoil";
import { customPackageModalState } from "../../recoil/atoms/common";
import classes from "./custom-package-request.module.less";
import classNames from "classnames";
import { CarRental, FlightLand, Hotel, Landscape } from "@mui/icons-material";
import Image from "next/image";
import ImageWithFallback from "../image-with-fallback";
import { motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";

const CustomPackageUI = () => {
  const setCustomPackageState = useSetRecoilState(customPackageModalState);
  const [isVisible, setIsVisible] = useState(false);
  const divRef = useRef(null);
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsVisible(entry.isIntersecting);
      },
      { threshold: 0.1 }
    );

    if (divRef.current) {
      observer.observe(divRef.current);
    }

    return () => {
      if (divRef.current) {
        observer.unobserve(divRef.current);
      }
    };
  }, []);

  return (
    <div className={classes.custom_booking_wrapper_outer}>
      <div
        className={classNames(
          classes.custom_booking_wrapper,
          "content-container"
        )}
      >
        <motion.div
          ref={divRef}
          initial="hidden"
          animate={isVisible ? "visible" : "hidden"}
          variants={{
            hidden: { opacity: 0, scale: 0.7 },
            visible: { opacity: 1, scale: 1 },
          }}
          transition={{ duration: 0.7 }}
          className={classes.custom_package}
        >
          <div className={classes.img_wrapper}>
            <Image
              className={classes.img}
              src={"/images/remove-back.png"}
              height={500}
              width={400}
            />

            <div className={classes.money_back}>
              <Image src={"/images/money_back.png"} height={200} width={200} />
            </div>
          </div>
        </motion.div>

        <div className={classes.custom_package_details}>
          <div className={classes.custom_package_wrapper}>
            <div className={classes.title}>
              100% Satisfaction Guaranteed
              <br /> or Your Money Back <br /> Explore Kashmir with Confidence!
            </div>
          </div>
          <div className={classes.details}>
            Experience the beauty of Kashmir risk-free.
            <br /> If you're not satisfied, we'll refund your money, no
            questions asked! <br />
            Book your dream trip now!
          </div>
          <div className={classes.amenities_wrapper}>
            <div className={classes.amenity_item}>
              <FlightLand style={{ marginRight: 8 }} />
              <span className="bold-text ">Flight Booking</span>
            </div>
            <div className={classes.amenity_item}>
              <Hotel style={{ marginRight: 8 }} />
              <span className="bold-text">Hotel Booking</span>
            </div>
            <div className={classes.amenity_item}>
              <CarRental style={{ marginRight: 8 }} />
              <span className="bold-text">Airport Transfer</span>
            </div>
            <div className={classes.amenity_item}>
              <Landscape style={{ marginRight: 8 }} />
              <span className="bold-text">Sight Seeing</span>
            </div>
          </div>

          <div
            className={classes.custom_action}
            onClick={() => setCustomPackageState(true)}
          >
            <span className="bold-text">Book your customized package</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CustomPackageUI;
