import classNames from "classnames";
import { useRouter } from "next/router";
import { useRecoilState } from "recoil";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPersonWalkingLuggage, faPeopleGroup, faIndianRupeeSign, faLocationDot } from '@fortawesome/free-solid-svg-icons';
import ContentContainer from "../content-container/content-container";
import classes from './index.module.less';
import { selectedHotelState } from "../../recoil/atoms/common";

const HotelsPackages = ({ data }) => {
  const [selectedHotel, setSelectedHotel] = useRecoilState(selectedHotelState);
  const router = useRouter();


  const gotoHotelDetails = (item) => {

    setSelectedHotel(item);

    router.push("/hotel-details");
  };

  return (
    <ContentContainer>
      <div className={classNames(classes.hotels_parent_body)}>
        {data?.map((item, index) => (
          <div
            className={classNames(classes.hotels_inner_parent_body)}
            key={index}
            onClick={() => gotoHotelDetails(item)}
          >
            <div className={classNames(classes.hotels_inner_parent_body_img)}>
              <img src={item?.image} alt="" />
            </div>
            <div className={classNames(classes.hotels_inner_parent_body_stars)}>
              <div className={classNames(classes.stars_one)}>
                <span>{item?.discription}</span>
              </div>
              <div className={classNames(classes.stars_two)}>
                <span> <FontAwesomeIcon icon={faLocationDot} /> {item?.location}</span>
              </div>
            </div>
            <div className={classNames(classes.hotels_inner_parent_body_dec)}>
              <span>{item?.name}</span>
            </div>
            
            <div className={classNames(classes.hotels_inner_parent_body_price)}>
              <span> <FontAwesomeIcon icon={faPeopleGroup} /> {item?.per_room_capacity}</span>
              <span> <FontAwesomeIcon icon={faIndianRupeeSign} /> {item?.per_room_rate}</span>
            </div>
            <div className={classNames(classes.activities_container)}>
              <span> <FontAwesomeIcon icon={faPersonWalkingLuggage} /> {item?.check_out}</span>
              <span><FontAwesomeIcon icon={faPersonWalkingLuggage} />{item?.check_in}</span>
            </div>
          </div>
        ))}
      </div>
    </ContentContainer>
  );
};

export default HotelsPackages;
