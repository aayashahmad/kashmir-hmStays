import { useEffect, useState } from "react";
import classes from "./wishlist.module.less";
import { callApi } from "../../../services/api/callApi";
import { useRecoilValue } from "recoil";
import { loginDataState } from "../../../recoil/atoms/common";

const CustomBookings = () => {
  //recoil states
  const loginData = useRecoilValue(loginDataState);

  const [customBookings, setCustomBookings] = useState([]);

  useEffect(() => {
    if (loginData?.data?.mobile) {
      callApi({
        endPoint: `custom_package/phone/${loginData?.data?.mobile}`,
        method: "GET",
        callback: (result) => {
          if (result?.status === 200 && result.data?.data) {
            setCustomBookings(result.data.data);
          } else {
            console.log("error");
          }
        },
      });
    }
  }, []);

  return (
    <div className={classes.bookings_wrapper}>
      <div className={classes.hero_heading}>Custom Bookings</div>

      <div className={classes.my_bookings_items_wrapper}>
        {customBookings?.length ? (
          customBookings?.map((booking, index) => {
            return (
              <div className={classes.my_bookings_items} key={index}>
                <div className={classes.left}>
                  <div className={classes.contact_heading}>Contact Details</div>
                  <div className={classes.details}>
                    <div className={classes.booked_items}>
                      <span className={classes.bold_text}>Name:</span>
                      <span className={classes.light_text}>
                        {booking.firstname + " " + booking.lastname}
                      </span>
                    </div>
                    <div className={classes.booked_items}>
                      <span className={classes.bold_text}>Phone:</span>
                      <span className={classes.light_text}>
                        {booking.phone}
                      </span>
                    </div>
                    <div className={classes.booked_items}>
                      <span className={classes.bold_text}>Email:</span>
                      <span className={classes.light_text}>
                        {booking.email}
                      </span>
                    </div>
                  </div>
                </div>
                <div className={classes.right}>
                  <div className={classes.package_heading}>Package Details</div>
                  <div className={classes.details}>
                    <div className={classes.booked_items}>
                      <span className={classes.bold_text}>Passengers:</span>
                      <span className={classes.light_text}>
                        {booking.passengers}
                      </span>
                    </div>
                    <div className={classes.booked_items}>
                      <span className={classes.bold_text}>Destionation:</span>
                      <span className={classes.light_text}>
                        {booking.destination}
                      </span>
                    </div>
                    <div className={classes.booked_items}>
                      <span className={classes.bold_text}>Number of days:</span>
                      <span className={classes.light_text}>
                        {booking.no_of_days}
                      </span>
                    </div>
                    <div className={classes.booked_items}>
                      <span className={classes.bold_text}>Activities:</span>
                      <span className={classes.light_text}>
                        {booking.activity}
                      </span>
                    </div>
                    <div className={classes.booked_items}>
                      <span className={classes.bold_text}>Car:</span>
                      <span className={classes.light_text}>
                        {booking.car_id}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            );
          })
        ) : (
          <div>No Bookings</div>
        )}
      </div>
    </div>
  );
};

export default CustomBookings;
