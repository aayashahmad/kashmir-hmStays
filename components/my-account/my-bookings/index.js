import { useEffect, useState } from "react";
import classes from "./bookings.module.less";
import { callApi } from "../../../services/api/callApi";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { loginDataState, successErrorModalState } from "../../../recoil/atoms/common";
import { Dropdown } from "react-bootstrap";
import { AddHotelReview, SubmitReview } from "../../../services/apis/apisHome";
import { green } from "@mui/material/colors";

const MyBookings = () => {
  const [bookings, setBookings] = useState([]);

  const [rating, setRating] = useState(0)

  // apis
  const SubmitReviewFunc = SubmitReview();

  const loginData = useRecoilValue(loginDataState);
  //recoil states
  const setSuccessErrorModalValues = useSetRecoilState(successErrorModalState);

  useEffect(() => {
    if (loginData?.data?.mobile) {
      callApi({
        endPoint: `booking/user/phone/${loginData?.data?.mobile}`,
        method: "GET",
        callback: (result) => {
          console.log("LOG___ bookings are---", result);
          if (result?.status === 200 && result.data?.data) {
            setBookings(result.data.data);
          } else {
            console.log("error");
          }
        },
      });
    }
  }, []);

  console.log("LOG___ bookings", bookings);


  const submitReview = ( booking) => {

    // console.log("Booking is***", booking)

    // return;


    let data = {
      "description": "desc",
      "hotel_id": booking.hotel_id,
      "stars": +rating,
      "title": "title"
    };



    console.log("Booking data is----", data)

    callApi({
      endPoint: "hotels/review",
      method: "POST",
      data:data,
      callback: (result) => {
        console.log("result from the api is", result)
        if (result?.status === 201 && result.data?.detail) {
           setSuccessErrorModalValues({
          showModal: true,
          success: true,
          modalTitle: "Your review is submitted!",
        });
        } else {
          console.log("error");
        }
      },
    });
  }

  return (
    <div className={classes.bookings_wrapper}>
      <div className={classes.hero_heading}>Bookings</div>

      <div className={classes.my_bookings_items_wrapper}>
        {bookings?.length ? (
          bookings?.map((booking, index) => {
            return (
              <div className={classes.my_bookings_items} key={index}>
                <div className={classes.left}>
                  <div className={classes.contact_heading}>Contact Details</div>
                  <div className={classes.details}>
                    <div className={classes.booked_items}>
                      <span className={classes.bold_text}>Name:</span>
                      <span className={classes.light_text}>{booking.name}</span>
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
                      <span className={classes.bold_text}>Destination:</span>
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
                    {/* <div className={classes.booked_items}>
                                  <span className={classes.bold_text}>Activities:</span><span className={classes.light_text}>{booking.activity}</span>
                                </div>
                                <div className={classes.booked_items}>
                                   <span className={classes.bold_text}>Car:</span><span className={classes.light_text}>{booking.car_id}</span>
                                </div> */}
                  </div>
                </div>

                <div className="reviews_row" style={{display:"flex", justifyContent:"flex-start", alignItems:"center", marginTop: 12}}>
                  <div className="review_heading font10" style={{marginRight: 20, marginLeft: 12}}>Add Review</div>
                  <div className="review_details">
                    <Dropdown onSelect={(id) => setRating(id)} style={{marginRight: 20}} >
                      <Dropdown.Toggle variant="outline-primary" id="dropdown-basic"  onSelect={(id) => console.log("hello", id) } >
                        Rating
                      </Dropdown.Toggle>

                      <Dropdown.Menu >
                        <Dropdown.Item eventKey="1">1</Dropdown.Item>
                        <Dropdown.Item eventKey="2">2</Dropdown.Item>
                        <Dropdown.Item eventKey="3">3</Dropdown.Item>
                        <Dropdown.Item eventKey="4">4</Dropdown.Item>
                        <Dropdown.Item eventKey="5">5</Dropdown.Item>
                      </Dropdown.Menu>
                    </Dropdown>
                  </div>

                  <div onClick={() => submitReview(booking)} className="button"  style={{ color: 'green' }} >Submit</div>
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

export default MyBookings;
