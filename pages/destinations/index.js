import { useTranslation } from "react-i18next";
import MainWrapper from "../../components/wrapper/wrapper";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import GroupTour from "../../components/group-tour/Group-Tour";
import ContentContainer from "../../components/content-container/content-container";
import { useRecoilValue } from "recoil";
import { selectedLocationState } from "../../recoil/atoms/common";
import { useEffect, useState } from "react";
import { callApi } from "../../services/api/callApi";
import PackageHeroComponent from "../../components/package-hero-component";
import { useRouter } from "next/router";
import CustomHead from "../../components/head";
import DestinationsComponent from "../../components/destinations-component/destinations-component";
import FlipCard from "../../components/flip-card";

const Destinations = () => {
  const { t } = useTranslation("common");
  const router = useRouter();

  //recoil states
  const selectedLocation = useRecoilValue(selectedLocationState);
  const [schemaValue, setSchemaValue] = useState([]);

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
        image={"/images/destinations/destinations_back.webp"}
        location={"Kashmir"}
        title={"Top most visited destinations in Kashmir"}
        discount={20}
        rate={10000}
      />

      <ContentContainer>
        <DestinationsComponent router={router} />
        {/* <FlipCard /> */}

        <GroupTour />
      </ContentContainer>
    </MainWrapper>
  );
};

export const getStaticProps = async ({ locale }) => ({
  props: {
    ...(await serverSideTranslations(locale ?? "es", ["common"])),
  },
});

export default Destinations;
