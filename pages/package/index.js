import MainWrapper from "../../components/wrapper/wrapper";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { useTranslation } from "react-i18next";
import { useRecoilValue, useSetRecoilState } from "recoil";
import ContentContainer from "../../components/content-container/content-container";
import classes from "./package-details.module.less";
import BlogLine from "../../components/blog-line";
import RequestModal from "../../components/request-modal/request-modal";
import { useState, useEffect } from "react";
import { callApi } from "../../services/api/callApi";
import { successErrorModalState } from "../../recoil/atoms/common";
import { useRouter } from "next/router";
import CustomHead from "../../components/head";
import LeftHighlightedTitle from "../../components/left-highlighted-title";
import Tag from "../../components/tag";
import SingularFaqs from "../../components/singular-faqs";
import PackageDetailsImageGrid from "../../components/package-details-image-grid/package-details-image-grid";
import FullScreenGalleryModal from "../../components/full-screen-gallery-modal/full-screen-gallery-modal";
import CustomAccordion from "../../components/custom-accordian/custom-accordian";
import InsidePackage from "../../components/inside-package";
import StayTypes from "../../components/stay-component";
import MorePackages from "../../components/more-packages";
import {
  AirplaneTicketOutlined,
  BeachAccess,
  CurrencyRupee,
  FoodBank,
  Hotel,
  LocalTaxiOutlined,
  People,
  Person,
  Phone,
  PriceChange,
  Star,
  Watch,
  Wifi,
} from "@mui/icons-material";
import HiddenData from "../../components/hidden-data";
import Reviews from "../../components/reviews/reviews";
import ImageWithFallback from "../../components/image-with-fallback";
import { Avatar } from "@mui/material";

const PackageDetails = () => {
  const { t } = useTranslation("common");
  const router = useRouter();

  //recoil states
  const setSuccessErrorModalValues = useSetRecoilState(successErrorModalState);

  //local states
  const [modalData, setModalData] = useState(false);
  const [inputValues, setInputValues] = useState({});
  const [schemaValue, setSchemaValue] = useState([]);
  const [pack, setPack] = useState(null);
  const [openGalleryModal, setOpenGalleryModal] = useState(false);
  const [packageGallery, setPackageGallery] = useState([]);
  const [selectedChoice, setSelectedChoice] = useState(null);
  const [inclusions, setInclusions] = useState([])
  const [exclusions, setExclusions] = useState([])

  useEffect(() => {
    if (pack?.price_variations?.length > 0) {
      setSelectedChoice(pack?.price_variations[0]);
    }
  }, [pack]);

  useEffect(() => {
    if (typeof window !== "undefined") {
      callApi({
        endPoint: "hotels" + "/" + router?.query?.id,
        method: "GET",
        callback: (result) => {
          console.log("LOG___ result", result);
          if (result?.status === 200) {
            if (result.data?.id) {
              setPack(result.data);
              const  inclusions = [];
              const  exclusions = [];

              if(result.data.wifi){
                inclusions.push("wifi")
              }else{
                exclusions.push("wifi")
              }

              if(result.data.breakfast){
                inclusions.push("breakfast")
              }else{
                exclusions.push("breakfast")
              }

              if(result.data.gym){
                inclusions.push("gym")
              }else{
                exclusions.push("gym")
              }

              if(result.data.lunch){
                inclusions.push("lunch")
              }else{
                exclusions.push("lunch")
              }

              if(result.data.dinner){
                inclusions.push("dinner")
              }else{
                exclusions.push("dinner")
              }

              setInclusions(inclusions)
              setExclusions(exclusions)




              if (result.data[0]?.gallery?.length) {
                let images = result.data.data[0]?.gallery.map((item) => {
                  return {
                    src: item?.url,
                    alt: item?.alt,
                  };
                });
                setPackageGallery(images);
              }
            }
          } else {
            console.log("error");
          }
        },
      });
    }
  }, [router]);

  console.log("LOG___ pack", pack);

  const onChange = (val, type) => {
    let error = `${type}Error`;
    setInputValues({ ...inputValues, [type]: val, [error]: null });
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
      name: inputValues?.name,
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
          if (result?.data?.schema_value?.length > 0) {
            setSchemaValue(result?.data?.schema_value);
          }
        }
      },
    });
  }, []);

  useEffect(() => {
    setTimeout(() => {
      setModalData({ showModal: true });
    }, 15000);
  }, []);

  const callDoctor = () => {
    const phoneNumber = "9826000000";
    if (phoneNumber) {
      window.open(`tel:${phoneNumber}`);
    } else {
      console.log("No phone number provided");
    }
  };


  console.log("log___ pack", pack)

  return (
    <MainWrapper
      t={t}
      headerAbsolute={true}
      headerFixed={false}
      smallHeader={true}
    >
      {pack && (
        <CustomHead
          metaTitle={pack?.meta_title}
          metaDescription={pack?.meta_description}
          ogTitle={pack?.meta_title}
          ogDescription={pack?.meta_description}
          schemaValue={schemaValue.value ?? ""}
        />
      )}

      {/* <PackageDetailsImageGrid
        images={packageGallery.slice(0, 5)}
        openModal={() => setOpenGalleryModal(true)}
      /> */}

      <ImageWithFallback
        src={pack?.image?.url}
        alt="spotlight"
        width={"100%"}
        height={"700px"}
      />

      <ContentContainer>
        <div className={classes.main_wrapper}>
          {pack && (
            <div className={classes.left_side}>
              <div className={classes.details_wrapper + " card"}>
                <LeftHighlightedTitle title={pack?.name} size={16} />
                {/* <div className={classes.description_wrapper_days}>
                  <span>6 days 4 nights</span>
                </div> */}

                <div className={classes.price_wrapper_parent}>
                  <div className={classes.items}>
                    <span className={classes.icon_wrapper}>
                      <Star fontSize="large" />{" "}
                      <span>{pack?.rating || 4}/5</span>
                    </span>
                  </div>

                  <div className={classes.items}>
                    <span className={classes.icon_wrapper}>
                      <CurrencyRupee />
                      <span>{pack?.per_room_rate}</span>
                    </span>
                  </div>

                  <div className={classes.items}>
                    <span className={classes.icon_wrapper}>
                      <PriceChange />
                      <span>{pack?.per_person_rate}</span>
                    </span>
                  </div>

                  <div className={classes.items}>
                    <span className={classes.icon_wrapper}>
                      <People />{" "}
                      <span style={{ marginLeft: "3px" }}>
                        {" "}
                        {pack?.per_room_capacity}
                      </span>
                    </span>
                  </div>
                </div>

                <div className={classes.description_wrapper}>
                  {pack?.tags ? (
                    <div className={classes.tags_wrapper}>
                      {pack?.tags?.split("|").map((tag, index) => (
                        <Tag id={index} tag={tag} />
                      ))}
                    </div>
                  ) : null}
                  <div
                    className={classes.description}
                    dangerouslySetInnerHTML={{
                      __html: pack.description,
                    }}
                  ></div>
                  {/* <span dangerouslySetInnerHTML={{ __html: row.description }}></span> */}
                </div>
              </div>

              <div className={classes.icons_wrapper_parent + " card"}>
                <LeftHighlightedTitle title={"Top services"} />

                <div className={classes.icons_wrapper}>
                  <div className={classes.icons_container}>
                    <LocalTaxiOutlined fontSize="large" />
                    <span>Parking</span>
                  </div>
                  <div className={classes.icons_container}>
                    <Hotel fontSize="large" />
                    <span>Bed: {pack?.bed_size || "King size"}</span>
                  </div>
                  <div className={classes.icons_container}>
                    <FoodBank fontSize="large" />
                    <span>Breakfast</span>
                  </div>
                  <div className={classes.icons_container}>
                    <Wifi fontSize="large" />
                    <span>WiFi</span>
                  </div>
                </div>
              </div>
              {/* <StayTypes
                variations={pack?.price_variations}
                setSelectedChoice={setSelectedChoice}
                discount={pack?.discount}
              /> */}
              {pack?.itinerary?.length ? (
                <div className={classes.overview_wrapper + " card"}>
                  <LeftHighlightedTitle title={" Package Itinerary"} />

                  {pack?.itinerary.map((item, index) => {
                    return (
                      <CustomAccordion
                        title={item?.title}
                        content={item?.description}
                        tags={item?.tags}
                        key={index}
                      />
                    );
                  })}
                </div>
              ) : null}
              <InsidePackage
                inclusions={inclusions}
                exclusions={exclusions}
              />
              {/* <HiddenData data={pack?.hidden_data} /> */}
              <Reviews packId={pack?.id} packName={pack.name} />

              {pack?.faqs?.length ? <SingularFaqs faqs={pack?.faqs} /> : null}
            </div>
          )}

          {pack && (
            <div className={classes.right_side}>
              <div className={classes.price_and_btn_wrapper + " card"}>
                <div className={classes.package_price_wrapper}>
                  <div className={classes.discounted_price}>
                    <div className={classes.discounted_price_title}>
                      <span className="font14">Starting from</span>
                    </div>
                    <div className={classes.package_price_wrapper_inner}>
                      <div className={classes.package_price}>
                        <span
                          className={classes.package_price_value + " font20"}
                        >
                          INR {pack?.per_room_rate}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* <div className={classes.discounted_price_parent}>
                    <span className={classes.discounted_price_value}>
                      <CurrencyRupee fontSize="small" />
                      <span className="font13">{selectedChoice?.value}</span>
                    </span>
                    <span className={classes.discount_percent}>
                      (Save upto <span>{pack?.discount})</span>
                    </span>
                  </div> */}
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
        {/* <MorePackages title={"More packages you may like"} router={router} /> */}

        {/* <BlogLine title={"Latest blogs"} router={router} /> */}
      </ContentContainer>

      <FullScreenGalleryModal
        onHide={() => setOpenGalleryModal(false)}
        open={openGalleryModal}
        images={packageGallery}
      />

      <RequestModal
        showModal={modalData.showModal}
        backdrop={() => setModalData({ ...modalData, showModal: false })}
        onHide={() => setModalData({ ...modalData, showModal: false })}
        onChange={onChange}
        inputValues={inputValues}
        onSubmit={() => sendRequest()}
        data={pack}
      />

      <div className={classes.stickyImageContainer} onClick={callDoctor}>
        <Phone fontSize="large" />
        <div className="font10">Agent on call</div>
      </div>
    </MainWrapper>
  );
};

export const getStaticProps = async ({ locale }) => ({
  props: {
    ...(await serverSideTranslations(locale ?? "es", ["common"])),
  },
});

export default PackageDetails;
