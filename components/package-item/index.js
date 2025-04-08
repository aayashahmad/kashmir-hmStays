import { useRef, useState } from "react";
import RequestModal from "../request-modal/request-modal";
import { motion } from "framer-motion";
import {
  selectedPackageState,
  successErrorModalState,
} from "../../recoil/atoms/common";
import { useSetRecoilState } from "recoil";
import { Rating } from "@mui/material";
import { getFinalPackagePrice } from "../../hooks/use-get-price-from-pack";
import ImageWithFallback from "../image-with-fallback";
import MyButton from "../my-button";
import useScreenWidth from "../../hooks/useScreenWidth";
import { useInView } from "framer-motion";
import { Phone } from "@mui/icons-material";
import { useRouter } from "next/router";
// import { classes } from "./package-item.module.less";

const PackageItem = ({ pack }) => {
  const router = useRouter();
  const [showModal, setShowModal] = useState(false);
  const [inputValues, setInputValues] = useState({});
  let screenWidth = useScreenWidth();
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  console.log("LOG___ pack", pack);

  //recoil states
  const setSuccessErrorModalValues = useSetRecoilState(successErrorModalState);
  const setSelectedPack = useSetRecoilState(selectedPackageState);

  const onChange = (val, type) => {
    let error = `${type}Error`;
    setInputValues({ ...inputValues, [type]: val, [error]: null });
  };

  const gotoPackDetails = (item) => {
    setSelectedPack(item);
    router.push(`/package?slug=${item.name.replaceAll(" ", "")}&id=${item.id}`);
  };

  const makeCall = () => {
    window.open("tel:7006052604");
  };

  const sendRequest = () => {
    let data = {
      activity_id: 0,
      car_id: 0,
      destination_id: 0,
      hotel_id: 0,
      email: inputValues?.email,
      message: inputValues?.message,
      name: pack?.location,
      no_of_days: inputValues?.travellers,
      package_id: pack?.id,
      passengers: inputValues?.travellers,
      phone: inputValues?.phone,
    };

    callApi({
      endPoint: "booking",
      method: "POST",
      callback: (result) => {
        setShowModal(false);
        if (result?.status === 201) {
          setSuccessErrorModalValues({
            showModal: true,
            success: true,
            modalTitle: "Your request has been submitted!",
          });
        } else {
          setSuccessErrorModalValues({
            showModal: true,
            success: false,
            modalTitle:
              "There is some issue in submitting your request, Please try again!",
          });
          console.log("error");
        }
      },

      data: data,
    });
  };

  const childVarients = {
    hidden: { opacity: 0.5, scale: 0.94 },
    visible: {
      opacity: 1,
      scale: 1,
    },
  };

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      variants={childVarients}
      style={
        screenWidth < 768
          ? styles.honeymoon_inner_parent_body_media_query
          : styles.honeymoon_inner_parent_body
      }
    >
      <div onClick={() => gotoPackDetails(pack)}>
        <div
          style={
            screenWidth < 768
              ? styles.honeymoon_inner_parent_body_img_media_query
              : styles.honeymoon_inner_parent_body_img
          }
        >
          <ImageWithFallback
            src={pack?.image?.url}
            alt={pack?.name}
            style={styles.img}
            width={350}
            height={350}
          />
        </div>
        {/* <div style={styles.honeymoon_inner_parent_body_overly}>
          <span>Save upto {pack.discount}%</span>
        </div> */}
        <div style={styles.honeymoon_inner_parent_body_stars}>
          {/* <div style={styles.stars_one}>
            <span>
              {+pack.duration + 1} Days {pack.duration} Nights
            </span>
          </div> */}
          <div style={styles.stars_two}>
            <Rating
              name="read-only"
              value={pack?.avg_rating ?? 5}
              readOnly
              style={{ fontSize: 18 }}
            />
          </div>
        </div>
        <div
          style={{
            ...(screenWidth < 1550 && screenWidth > 1150
              ? styles.honeymoon_inner_parent_body_dec_1550
              : screenWidth < 1150
              ? styles.honeymoon_inner_parent_body_dec_1150
              : styles.honeymoon_inner_parent_body_dec),
            height: '30px',
            minHeight: '34px'
            
          }}
        >
          <span  style={
            styles.honeymoon_inner_parent_body_price
          }>Homestay: {pack.name.substring(0, 100)}</span>
        </div>
        <div
          style={{
            ...styles.honeymoon_inner_parent_body_call, // Spread the existing styles
            marginBottom: '10px' // Add margin-bottom directly
          } 
          }
        >
          <span >Location: {pack.location.substring(0, 100)}</span>
        </div>

        <div
          className={" font10"}
          dangerouslySetInnerHTML={{
            __html:
              pack?.description?.split(" ").slice(0, 15).join(" ") + "...",
          }}
        ></div>
        <div style={styles.honeymoon_inner_parent_body_price}>
          <span>
            {(pack.currency ? pack.currency : "INR") +
              ": " +
              // getFinalPackagePrice(pack)
              pack.per_room_rate}
          </span>
        </div>
      </div>
      <div style={styles.honeymoon_inner_parent_body_call}>
        {/* <MyButton
          title="Call Now"
          screenWidth={screenWidth}
          buttonAction={makeCall}
          primary={true}
        /> */}

        <SquareButton buttonAction={makeCall}>
          <Phone />
        </SquareButton>
        <MyButton
          title="Book Now"
          primary
          buttonAction={() => setShowModal(true)}
          width={"80%"}
        />
      </div>

      <RequestModal
        showModal={showModal}
        backdrop={() => setShowModal(false)}
        onHide={() => setShowModal(false)}
        onChange={onChange}
        inputValues={inputValues}
        onSubmit={() => sendRequest()}
        data={pack}
      />
    </motion.div>
  );
};

const SquareButton = ({ buttonAction, children }) => {
  return (
    <div style={styles.square_button} onClick={buttonAction}>
      {children}
    </div>
  );
};
const styles = {
  honeymoon_inner_parent_body: {
    cursor: "pointer",
    position: "relative",
    margin: "20px 10px",
  },

  honeymoon_inner_parent_body_media_query: {
    marginBottom: "70px",
    position: "relative",
  },
  honeymoon_inner_parent_body_img: {
    height: "22vw,",
  },
  honeymoon_inner_parent_body_img_media_query: {
    height: "80vh,",
  },

  img: {
    minHeight: 350,
    height: 350,
    width: "100%",
    borderRadius: "10px",
    objectFit: "cover",
  },
  honeymoon_inner_parent_body_overly: {
    position: "absolute",
    top: "15px",
    background: "linear-gradient(90deg, #eb1e24, #aa0004)",
    height: "20px",
    fontSize: "12px",
    padding: " 0 8px",
    paddingRight: "10px",
    color: "#ffffff",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: "0 20px 20px 0",
  },
  honeymoon_inner_parent_body_stars: {
    display: "flex",
    justifyContent: "space-between",
    paddingTop: "20px",
  },
  stars_one: {
    color: "#7a7a7a",
    fontSize: "16px",
  },
  stars_two: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    gap: 8,
    color: "#19ad6f",
    fontSize: " 20px",
  },
  honeymoon_inner_parent_body_dec: {
    margin: "10px 0px 6px",
    fontWeight: 500,
    fontSize: "16px",
    // minHeight: "110px",
    minHeight: "60px",
    maxHeight: "60px",
    height: "60px",
    overFlow: "hidden",
    textalign: "justify",
  },

  honeymoon_inner_parent_body_dec_1550: {
    margin: "10px 0px 6px",
    fontWeight: 500,
    fontSize: "16px",
    // minHeight: "150px",
    minHeight: "60px",
    maxHeight: "60px",
    height: "60px",
    overFlow: "hidden",
    textalign: "justify",
  },

  honeymoon_inner_parent_body_dec_1150: {
    margin: "10px 0px 6px",
    fontWeight: 500,
    fontSize: "16px",
    // minHeight: "170px",
    minHeight: "60px",
    maxHeight: "60px",
    height: "60px",
    overFlow: "hidden",
    textalign: "justify",
  },
  honeymoon_inner_parent_body_price: {
    display: "flex",
    justifycontent: "space-between",
    alignItems: "center",
    fontSize: "18px",
    fontWeight: 600,
  },
  honeymoon_inner_parent_body_call: {
    paddingTop: "12px",
    display: "flex",
    justifyContent: "space-between",
    gap: "10px",
  },

  callback_button: {
    background: "var(--primary-color)",
    color: "#ffffff",
    width: "150px",
    height: "50px",
    borderRadius: "7px",
    fontSize: "14px",
    fontWeight: 500,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  make_call_button: {
    background: "var(--secondary-color)",
    color: "#ffffff",
    width: "150px",
    height: "50px",
    borderRadius: "7px",
    fontSize: "14px",
    fontWeight: 500,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },

  square_button: {
    // background: "var(--primary-color)",
    // color: "#ffffff",
    width: "50px",
    height: "46px",
    borderRadius: "8px",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    border: "1px solid #f47625",
  },

  show_days: {
    fontSize: "12px",
    display: "flex",
    alignItems: "center",
    gap: "5px",
    marginTop: "6px",
    padding: "10px 10px 10px 0px",
    background:
      "linear-gradient(180deg, rgba(255, 186, 10, .1), rgba(255, 186, 10, 0))",
  },
};

export default PackageItem;
