import MainWrapper from "../../components/wrapper/wrapper";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { useTranslation } from "react-i18next";
import { useRecoilValue, useSetRecoilState } from "recoil";
import ContentContainer from "../../components/content-container/content-container";
import classes from "./hotel-details.module.less";
import PackageHeroComponent from "../../components/package-hero-component";
import BlogLine from "../../components/blog-line";
import HotelRequestModal from "../../components/request-modal/request-modal";
import { useState, useEffect } from "react";
import { callApi } from "../../services/api/callApi";
import {
  faPersonWalkingLuggage,
  faPeopleGroup,
  faIndianRupeeSign,
  faLocationDot,
  faBed,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  selectedHotelState,
  successErrorModalState,
} from "../../recoil/atoms/common";
import { useRouter } from "next/router";
import CustomHead from "../../components/head";

const PackageDetails = () => {
  const { t } = useTranslation("common");
  const router = useRouter();

  //recoil states
  const selectedHotel = useRecoilValue(selectedHotelState);
  const setSuccessErrorModalValues = useSetRecoilState(successErrorModalState);

  //local states
  const [modalData, setModalData] = useState(false);
  const [inputValues, setInputValues] = useState({});
  const [schemaValue, setSchemaValue] = useState([]);

  const onChange = (val, type) => {
    let error = `${type}Error`;
    setInputValues({ ...inputValues, [type]: val, [error]: null });
  };

  const sendRequest = () => {
    let { selectedHotel } = modalData;

    let data = {
      email: inputValues?.email,
      message: inputValues?.message,
      name: selectedHotel?.name,
      no_of_days: inputValues?.no_of_days,
      hotel_id: selectedHotel?.id,
      phone: inputValues?.phone,
    };

    callApi({
      endPoint: "booking/hotel",
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

  useEffect(() => {
    callApi({
      endPoint: `schema/schema_value/?ref_page=${router.pathname}`,

      method: "GET",
      callback: (result) => {
        if (result?.status === 200) {
          if (result?.data?.schema_value?.value) {
            setSchemaValue(result?.data?.schema_value);
          }
        } else {
          console.log("error");
        }
      },
    });
  }, []);

  return (
    <MainWrapper
      t={t}
      headerAbsolute={true}
      headerFixed={false}
      smallHeader={true}
    >
      {selectedHotel && (
        <CustomHead
          metaTitle={selectedHotel?.meta_title}
          metaDescription={selectedHotel?.meta_description}
          ogDescription={selectedHotel?.meta_description}
          ogTitle={selectedHotel?.meta_title}
          schemaValue={schemaValue.value ?? ""}
        />
      )}
      <PackageHeroComponent
        image={selectedHotel?.image?.url}
        title={selectedHotel?.name}
        description={selectedHotel?.discount}
        location={selectedHotel?.location}
        rate={selectedHotel?.per_room_rate}
      />

      <ContentContainer>
        <div className={classes.main_wrapper}>
          {selectedHotel && (
            <div className={classes.left_side}>

              <div className={classes.details_wrapper}>
                <div className={classes.dec_parent}>
                  <div className={classes.package_name}>
                    {selectedHotel?.name}
                  </div>
                </div>

                <div className={classes.price_wrapper_parent}>
                  <div className={classes.star_rating}>

                    <span>
                      <FontAwesomeIcon icon={faLocationDot} />
                      {selectedHotel?.location}
                    </span>
                  </div>

                  <div className={classes.price_wrapper}>
                    <span>
                      {" "}
                      <FontAwesomeIcon icon={faIndianRupeeSign} />{" "}
                      {selectedHotel?.per_room_rate}
                    </span>
                  </div>

                  <div className={classes.duration_wrapper}>
                    <span>
                      {" "}
                      <FontAwesomeIcon icon={faPersonWalkingLuggage} />{" "}
                      {selectedHotel?.check_out}
                    </span>
                    <span>
                      <FontAwesomeIcon icon={faPersonWalkingLuggage} />
                      {selectedHotel?.check_in}
                    </span>
                  </div>

                  <div className={classes.max_group_size}>
                    <span className={classes.value_name}>
                      <FontAwesomeIcon icon={faPeopleGroup} />
                      {selectedHotel?.per_room_capacity}
                    </span>
                  </div>
                </div>
              </div>
              <div className={classes.description_wrapper}>
                <p>{selectedHotel?.description}</p>
              </div>
            </div>
          )}

          {selectedHotel && (
            <div className={classes.right_side}>
              <div className={classes.price_and_btn_wrapper}>
                <div className={classes.package_price_wrapper}>
                  <div className={classes.package_price_wrapper_inner}>
                    <div className={classes.package_price}>
                      <span className={classes.package_price_value}>
                        INR {selectedHotel?.per_person_rate}
                      </span>
                      <span className={classes.package_price_details}>
                        {" "}
                        Per Person
                      </span>
                    </div>
                  </div>
                </div>

                <div className={classes.enquiry_btn_wrapper}>
                  <button
                    onClick={() => setModalData({ showModal: true })}
                    className={classes.enquiry_btn}
                  >
                    Send Enquiry
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>

        <BlogLine router={router} />
      </ContentContainer>

      <HotelRequestModal
        showModal={modalData.showModal}
        backdrop={() => setModalData({ ...modalData, showModal: false })}
        onHide={() => setModalData({ ...modalData, showModal: false })}
        onChange={onChange}
        inputValues={inputValues}
        onSubmit={() => sendRequest()}
        data={selectedHotel}
      />
    </MainWrapper>
  );
};

export const getStaticProps = async ({ locale }) => ({
  props: {
    ...(await serverSideTranslations(locale ?? "es", ["common"])),
  },
});

export default PackageDetails;
