import React, { useEffect, useState } from "react";
import MainWrapper from "../../../components/wrapper/wrapper";
import { useTranslation } from "react-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import ContentContainer from "../../../components/content-container/content-container";
import { useRouter } from "next/router";
import { callApi } from "../../../services/api/callApi";
import { selectedLocationState } from "../../../recoil/atoms/common";
import { useRecoilValue } from "recoil";
import PackageHeroComponent from "../../../components/package-hero-component";
import CustomHead from "../../../components/head";
import PackageListing from "../../../components/package-listing";
import LocationItem from "../../../components/location-component";

const Location = () => {
  const router = useRouter();
  const { t } = useTranslation("common");

  //recoil states
  const selectedLocation = useRecoilValue(selectedLocationState);

  //local states
  const [packages, setPackages] = useState([]);
  const [discount, setDiscount] = useState(0);
  const [lowestPrice, setLowestPrice] = useState(0);
  const [schemaValue, setSchemaValue] = useState([]);

  useEffect(() => {
    if (selectedLocation) {

      callApi({
        endPoint: `packages/location/${selectedLocation?.name}`,
        method: "GET",
        callback: (result) => {
          if (result?.status === 200) {
            setPackages(result.data.data);

            setDiscount(
              result.data.data.reduce((maxDiscount, pack) => {
                return pack.discount > maxDiscount
                  ? pack.discount
                  : maxDiscount;
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
    }
  }, [selectedLocation]);

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
      {selectedLocation && (
        <CustomHead
          metaTitle={selectedLocation?.meta_title}
          metaDescription={selectedLocation?.meta_description}
          ogDescription={selectedLocation?.meta_description}
          ogTitle={selectedLocation?.meta_title}
          schemaValue={schemaValue.value ?? ""}
        />
      )}

      <PackageHeroComponent
        image={selectedLocation?.image?.url}
        location={selectedLocation?.name}
        title={"Custom packages for " + selectedLocation?.name}
        discount={discount}
        rate={lowestPrice}
      />

      <ContentContainer>
      {selectedLocation && (
          <LocationItem item={selectedLocation} />
        )}
        {packages && <PackageListing myPackages={packages} />}
      </ContentContainer>
    </MainWrapper>
  );
};
export const getStaticProps = async ({ locale }) => ({
  props: {
    ...(await serverSideTranslations(locale ?? "es", ["common"])),
  },
});

export const getStaticPaths = async () => {
  return {
    paths: [],
    fallback: "blocking",
  };
};

export default Location;
