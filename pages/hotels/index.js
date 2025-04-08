import React, { useEffect, useState } from "react";
import HotelsPackages from "../../components/hotels-packages";
import MainWrapper from "../../components/wrapper/wrapper";
import PackageHeroComponent from "../../components/package-hero-component";
import { useTranslation } from "react-i18next";
import { callApi } from "../../services/api/callApi";
import CustomHead from "../../components/head";
import { useRouter } from "next/router";
import GroupTour from "../../components/group-tour/Group-Tour";
import TourismAlliances from "../../components/tourism-alliances";
import TourPackages from "../../components/tour-packages";
import { Container } from "react-bootstrap";
import SingularFaqs from "../../components/singular-faqs";

const Hotels = () => {
  const { t } = useTranslation("common");
  const [hotels, setHotels] = useState([]);
  const [discount, setDiscount] = useState(0);
  const [lowestPrice, setLowestPrice] = useState(0);
  const [schemaValue, setSchemaValue] = useState([]);

  const router = useRouter();

  useEffect(() => {
    callApi({
      endPoint: "hotels",
      method: "GET",
      callback: (result) => {
        if (result?.status === 200 && result.data?.data) {
          setHotels(result.data.data);

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
    <MainWrapper
      t={t}
      headerAbsolute={true}
      headerFixed={false}
      smallHeader={true}
    >
      {schemaValue && <CustomHead schemaValue={schemaValue.value} />}
      <PackageHeroComponent
        location={"Kashmir"}
        title={"Custom packages for you"}
        discount={discount}
        rate={lowestPrice}
      />

      <HotelsPackages data={hotels} />
      <Container>
        <GroupTour />
        <TourPackages
          title={"Best Deals"}
          description={
            "Our best travel deals on a wide array of tour packages let you make the most of your holiday that you are looking forward to spend here."
          }
        />
        <SingularFaqs />
        <TourismAlliances title={" Tourism Board Alliances"} />
      </Container>
    </MainWrapper>
  );
};

export default Hotels;
