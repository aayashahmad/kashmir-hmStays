import React from "react";
import MainWrapper from "../../components/wrapper/wrapper";
import classNames from "classnames";
import Image from "next/image";
import { useTranslation } from "react-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import classes from "../about-us/index.module.less";
import ContentContainer from "../../components/content-container/content-container";
import ActivitiesKashmiri from "../../components/activities-kashmiri4/activities";
import AroundWorld from "../../components/around-the-world";
import Gallery from "../../components/gallery-component";
import CustomHead from "../../components/head";
import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import { callApi } from "../../services/api/callApi";
import ImageWithFallback from "../../components/image-with-fallback";
import AboutUSContent from "../../components/about-us-content";

const AboutUS = () => {
  const [schemaValue, setSchemaValue] = useState({});
  const router = useRouter();

  const [gallery, setGallery] = useState([
    { id: 1, img: "/images/about-images/a1.jpg" },
    { id: 2, img: "/images/about-images/a7.jpg" },
    { id: 3, img: "/images/about-images/a3.jpg" },
    { id: 4, img: "/images/about-images/a4.jpg" },
    { id: 5, img: "/images/about-images/a5.jpg" },
    { id: 6, img: "/images/about-images/a6.jpg" },
    { id: 7, img: "/images/about-images/a7.jpg" },
    { id: 8, img: "/images/about-images/a8.jpg" },
    { id: 9, img: "/images/about-images/a5.jpg" },
    { id: 10, img: "/images/about-images/a6.jpg" },
    { id: 11, img: "/images/about-images/a7.jpg" },
    { id: 12, img: "/images/about-images/a8.jpg" },
  ]);

  const { t } = useTranslation("common");

  useEffect(() => {
    callApi({
      endPoint: `schema/schema_value/?ref_page=${router.pathname}`,

      method: "GET",
      callback: (result) => {
        if (result?.status === 200) {
          if (result?.data?.schema_value?.value) {
            setSchemaValue(result?.data?.schema_value?.value);
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
      {schemaValue && <CustomHead schemaValue={schemaValue.value} />}
      <div className={classNames(classes.aboutus_hero_img)}>
        <ImageWithFallback
          className="background_img"
          src="/images/hero-a.jpg"
          alt="hero"
          width={1600}
          height={800}
        />

        <div className={classNames(classes.aboutus_overly)}>
          <div className={classNames(classes.aboutus_overly_small)}>
            <span>OUR MISSION</span>
          </div>
          <div className={classNames(classes.aboutus_overly_big)}>
            <span>
              Shaping the <br /> future of travel
            </span>
          </div>
        </div>
      </div>
      <ActivitiesKashmiri />

      <AroundWorld />
      <ContentContainer>
        {/* <Gallery
          title0={"WORKING STYLE"}
          title1={"Life At"}
          title2={"Kashmir StaHomeStaysys"}
          images={gallery}
        /> */}
        <AboutUSContent/>
      </ContentContainer>
    </MainWrapper>
  );
};
export const getStaticProps = async ({ locale }) => ({
  props: {
    ...(await serverSideTranslations(locale ?? "es", ["common"])),
  },
});
export default AboutUS;
