import MainWrapper from "../../components/wrapper/wrapper";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { useTranslation } from "react-i18next";
import { useRecoilValue, useSetRecoilState } from "recoil";
import ContentContainer from "../../components/content-container/content-container";
import classes from "./carDetail.module.less";
import PackageHeroComponent from "../../components/package-hero-component";
import BlogLine from "../../components/blog-line";
import { useState, useEffect } from "react";
import { callApi } from "../../services/api/callApi";
import {
  selectedCarState,
  successErrorModalState,
} from "../../recoil/atoms/common";
import { useRouter } from "next/router";
import CustomHead from "../../components/head";
import CarRequestModal from "../../components/request-modal/car-request-modal";
import { Button } from "@mui/material";
import MorePackages from "../../components/more-packages";

const PackageDetails = () => {
  const { t } = useTranslation("common");

  //recoil states
  const selectedCar = useRecoilValue(selectedCarState);
  const setSuccessErrorModalValues = useSetRecoilState(successErrorModalState);

  //local states
  const [modalData, setModalData] = useState(false);
  const [inputValues, setInputValues] = useState({});
  const [schemaValue, setSchemaValue] = useState({});
  const [showFullDescription, setShowFullDescription] = useState(false);
  const router = useRouter();

  const onChange = (val, type) => {
    let error = `${type}Error`;
    setInputValues({ ...inputValues, [type]: val, [error]: null });
  };

  const sendRequest = () => {
    let { selectedCar } = modalData;

    let data = {
      email: inputValues?.email,
      message: inputValues?.message,
      name: inputValues?.name,
      car_id: selectedCar?.id,
      phone: inputValues?.phone,
    };

    callApi({
      endPoint: "booking/car",
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
            setSchemaValue(result?.data?.schema_value?.value);
          } else {
            console.log(
              "Error: 'schema_value' not found in API response data."
            );
          }
        } else {
          console.log("Error: API request failed with status", result?.status);
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
      {selectedCar && (
        <CustomHead
          metaTitle={selectedCar?.meta_title}
          metaDescription={selectedCar?.meta_description}
          ogTitle={selectedCar?.meta_title}
          ogDescription={selectedCar?.meta_description}
          schemaValue={schemaValue.value ?? ""}
        />
      )}
      <PackageHeroComponent
        imageResponsive={true}
        image={selectedCar?.image?.url}
        title={selectedCar?.name}
        discount={selectedCar?.discount}
        location={selectedCar?.location}
        rate={selectedCar?.per_day_rate}
      />

      <ContentContainer>
        <div className={classes.main_wrapper}>
          {selectedCar && (
            <div className={classes.left_side}>
              <div className={classes.details_wrapper}>
                <div className={classes.dec_parent}>
                  <div className={classes.package_name}>
                    {selectedCar?.name}
                  </div>
                </div>

                <div className={classes.price_wrapper_parent}>
                  <div className={classes.star_rating}>
                    <span>{selectedCar?.per_day_rate}/Day</span>
                  </div>

                  <div className={classes.price_wrapper}>
                    <span> {selectedCar?.per_room_rate}</span>
                  </div>

                  <div className={classes.duration_wrapper}>
                    <span> {selectedCar?.check_out}</span>
                    <span>{selectedCar?.check_in}</span>
                  </div>

                  <div className={classes.max_group_size}>
                    <span className={classes.value_name}>
                      {selectedCar?.doors} Doors
                    </span>
                  </div>
                </div>
                <div
                  style={styles.descriptionItem}
                  dangerouslySetInnerHTML={{
                    __html: showFullDescription
                      ? selectedCar?.description
                      : selectedCar?.description?.substring(0, 200) + "...",
                  }}
                >
                  {}
                </div>
                <div  className={classes.see_more_button}>
                  <Button
                    onClick={() => setShowFullDescription(!showFullDescription)}
                  >
                    {showFullDescription ? "See less" : "See more"}
                  </Button>
                </div>
              </div>
            </div>
          )}

          {selectedCar && (
            <div className={classes.right_side}>
              <div className={classes.price_and_btn_wrapper}>
                <div className={classes.package_price_wrapper}>
                  <div className={classes.discounted_price}>
                    <span className={classes.discounted_price_title}>
                      Starting from{" "}
                    </span>
                    <span className={classes.discounted_price_value}>
                      INR {selectedCar?.price + selectedCar?.discount / 100}
                    </span>
                  </div>

                  <div className={classes.package_price_wrapper_inner}>
                    <div className={classes.package_price}>
                      <span className={classes.package_price_value}>
                        INR {selectedCar?.per_day_rate}/Day
                      </span>
                      <span className={classes.package_price_details}>
                        INR {selectedCar?.per_hour_rate}/Hour
                      </span>
                    </div>
                  </div>
                </div>

                <div className={classes.enquiry_btn_wrapper}>
                  <button
                    onClick={() => setModalData({ showModal: true })}
                    className={classes.enquiry_btn}
                  >
                    Book Now
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>

        <MorePackages router={router} title={"Packages you might like..."} />
      </ContentContainer>

      <CarRequestModal
        showModal={modalData.showModal}
        backdrop={() => setModalData({ ...modalData, showModal: false })}
        onHide={() => setModalData({ ...modalData, showModal: false })}
        onChange={onChange}
        inputValues={inputValues}
        onSubmit={() => sendRequest()}
        data={selectedCar}
      />
    </MainWrapper>
  );
};

export const getStaticProps = async ({ locale }) => ({
  props: {
    ...(await serverSideTranslations(locale ?? "es", ["common"])),
  },
});

const styles = {
  descriptionItem: {
    padding: "20px 20px 0 20px",
  },
};

export default PackageDetails;
