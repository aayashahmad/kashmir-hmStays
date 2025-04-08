import React, { useEffect, useState } from "react";
import CarPackages from "../../components/car-packages";
import PackageHeroComponent from "../../components/package-hero-component";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import MainWrapper from "../../components/wrapper/wrapper";
import { callApi } from "../../services/api/callApi";
import { useRouter } from "next/router";
import CustomHead from "../../components/head";
import GroupTour from "../../components/group-tour/Group-Tour";
import TourismAlliances from "../../components/tourism-alliances";
import ContentContainer from "../../components/content-container/content-container";
import MorePackages from "../../components/more-packages";

const Cars = () => {
  const [cars, setcars] = useState([]);
  const [discount, setDiscount] = useState(0);
  const [lowestPrice, setLowestPrice] = useState(0);
  const [schemaValue, setSchemaValue] = useState(null);
  const router = useRouter();

  useEffect(() => {
    callApi({
      endPoint: "cars",
      method: "GET",
      callback: (result) => {
        if (result?.status === 200 && result.data?.data) {
          setcars(result.data.data);

          setDiscount(
            result.data.data.reduce((maxDiscount, pack) => {
              return pack.discount > maxDiscount ? pack.discount : maxDiscount;
            }, 0)
          );

          const lowestPrice = result.data.data.reduce((lowestPrice, pack) => {
            return pack.price < lowestPrice ? pack.price : lowestPrice;
          }, Infinity);

          setLowestPrice(lowestPrice);
        } else {
          console.log("error");
        }
      },
    });
  }, []);

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
    <MainWrapper headerAbsolute={true} headerFixed={false} smallHeader={true}>
      {schemaValue && <CustomHead schemaValue={schemaValue.value} />}

      <PackageHeroComponent discount={discount} rate={lowestPrice} />

      <CarPackages data={cars} />
      <ContentContainer>

        <MorePackages title={"Trending Packages"} router={router} />
        <GroupTour />
        <TourismAlliances title={" Tourism Board Alliances"} />
      </ContentContainer>
    </MainWrapper>
  );
};

export const getStaticProps = async ({ locale }) => ({
  props: {
    ...(await serverSideTranslations(locale ?? "es", ["common"])),
  },
});

export default Cars;
