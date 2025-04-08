import "react-alice-carousel/lib/alice-carousel.css";
import React, { useState } from "react";
import AliceCarousel from "react-alice-carousel";
import classes from "./home-packages.module.less";
import { useRouter } from "next/router";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { selectedPackageState } from "../../recoil/atoms/common";
import RequestModal from "../request-modal/request-modal";
import { callApi } from "../../services/api/callApi";
import { successErrorModalState } from "../../recoil/atoms/common";
import LeftHighlightedTitle from "../left-highlighted-title";
import ImageWithFallback from "../image-with-fallback";

const HomePackages = ({ packages, title }) => {
  const router = useRouter();

  const selectedPack = useRecoilValue(selectedPackageState);
  const [modalData, setModalData] = useState(false);
  const setSelectedPack = useSetRecoilState(selectedPackageState);
  const [inputValues, setInputValues] = useState({});
  const setSuccessErrorModalValues = useSetRecoilState(successErrorModalState);

  const onChange = (val, type) => {
    let error = `${type}Error`;
    setInputValues({ ...inputValues, [type]: val, [error]: null });
  };

  const responsive = {
    1024: { items: 4 },
    900: { items: 3 },
    800: { items: 3 },
    568: { items: 2 },
    430: { items: 1 },
  };

  const sendRequest = () => {
    let { selectedPack } = modalData;

    let data = {
      activity_id: 0,
      car_id: 0,
      destination_id: 0,
      hotel_id: 0,
      email: inputValues?.email,
      message: inputValues?.message,
      name: selectedPack?.location,
      no_of_days: inputValues?.travellers,
      package_id: selectedPack?.id,
      passengers: inputValues?.travellers,
      phone: inputValues?.phone,
    };

    callApi({
      endPoint: "booking",
      method: "POST",
      callback: (result) => {
        setModalData({ showModal: false });
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

  const gotoPackDetails = (item) => {
    setSelectedPack(item);

    router.push("/package-details");
  };

  const ImageItem = ({ item, index }) => {
    return (
      <div className={classes.home_destination_item} key={index}>
        <div className={classes.destination5}>
          <div
            className={classes.home_destination_img}
            onClick={() => gotoPackDetails(item)}
          >
            <ImageWithFallback
              className={classes.normal}
              src={item?.image?.url}
              alt={item?.image?.alt}
              width={400}
              height={200}
            />
            <div className={classes.title}>
              <span>{item.title}</span>
            </div>
            <div className={classes.details}>
              <span className={classes.category}>{item.category}</span>
            </div>
            <div className={classes.text_hover}>
              <span>{item.name}</span>
            </div>
            <div className={classes.price}>{item.price}</div>
            <div className={classes.description}>
              <span>{item.description?.slice(0, 80) + "..."}</span>
            </div>
          </div>
          <div className={classes.callbackButton}>
            <button onClick={() => setModalData({ showModal: true })}>
              {"Request Callback"}
            </button>
          </div>
        </div>
        <div className={classes.discount}>
          <span>{item.discount}%</span>
        </div>
      </div>
    );
  };

  return (
    <div className={classes.home_services_main}>
      <div className="content-container">
        <LeftHighlightedTitle title={title} />
        <div className={classes.home_services_body}>
          <AliceCarousel
            responsive={responsive}
            infinite
            disableDotsControls={false}
            disableButtonsControls
            autoPlay={true}
            animationDuration={2000}
            items={packages?.map((item, index) => {
              return <ImageItem item={item} index={index} />;
            })}
          />
        </div>
      </div>
      <div className={classes.enquiry_btn_wrapper}>
        <RequestModal
          showModal={modalData.showModal}
          backdrop={() => setModalData({ ...modalData, showModal: false })}
          onHide={() => setModalData({ ...modalData, showModal: false })}
          onChange={onChange}
          inputValues={inputValues}
          onSubmit={() => sendRequest()}
          data={selectedPack}
        />
      </div>
    </div>
  );
};

export default HomePackages;
