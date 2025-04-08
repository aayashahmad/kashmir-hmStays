import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { useTranslation } from "next-i18next";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import MainWrapper from "../components/wrapper/wrapper";
import { callApi } from "../services/api/callApi";
import HomeBlogShowcase from "../components/home-blog-showcase/home-blog-showcase";
import { useRecoilState } from "recoil";
import CustomHead from "../components/head";
import ContentContainer from "../components/content-container/content-container";
import { allPackagesState } from "../recoil/atoms/common";
import { useGetCategoryNames } from "../hooks/use-get-category-names";
import PackageListing from "../components/package-listing";
import ActivitiesHome from "../components/activities-home";
import Testimonial from "../components/testimonials";
import EnquryPackageModal from "../components/enquiry-modal/enqury-package-modal";
import Slider from "@mui/material/Slider";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";

function Home() {
  const router = useRouter();
  const { t } = useTranslation("common");
  const getAllCategories = useGetCategoryNames();
  const [packages, setPackages] = useRecoilState(allPackagesState);
  const [schemaValue, setSchemaValue] = useState({});
  const [scrollableTabs, setScrollableTabs] = useState([]);
  const [modalData, setModalData] = useState(false);

  const [searchKey, setSearchKey] = useState("");
  const [searchKeyError, setSearchKeyError] = useState("");
  const [value, setValue] = useState(1000);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Organization",
    url: "https://kashmirHomeStays.com",
    name: "Kashmir HomeStays",
    contactPoint: {
      "@type": "ContactPoint",
      telephone: "+917006052604",
      email: "bhatashu666@gmail.com",
      contactType: "Customer Service",
    },
  };

  useEffect(() => {
    callApi({
      endPoint: "hotels",
      method: "GET",
      callback: (result) => {
        if (result?.status === 200 && result?.data?.data?.length > 0) {
          setPackages(result.data.data);
        } else {
          console.error("Failed to fetch packages:", result);
        }
      },
    });
  }, []);

  useEffect(() => {
    if (packages.length && !scrollableTabs.length) {
      setScrollableTabs(getAllCategories());
    }
  }, [packages, getAllCategories]);

  useEffect(() => {
    callApi({
      endPoint: `schema/schema_value/?ref_page=${router.pathname}`,
      method: "GET",
      callback: (result) => {
        if (result?.status === 200 && result?.data?.schema_value) {
          setSchemaValue(result.data.schema_value);
        } else {
          console.error("Failed to fetch schema value:", result);
        }
      },
    });
  }, [router.pathname]);

  useEffect(() => {
    setTimeout(() => {
      setModalData({ showModal: true });
    }, 15000);
  }, []);

  const searchHotels = () => {
    callApi({
      endPoint: `hotels/location/${searchKey}`,
      method: "GET",
      callback: (result) => {
        if (result?.status === 200 && result?.data?.data?.length > 0) {
          setPackages(result.data.data);
        } else {
          setSearchKeyError("No results found");
          setTimeout(() => {
            setSearchKeyError(""); // Clear the error message after 3 seconds
          }, 3000);

          console.error("Failed to fetch packages:", result);
        }
      },
    });
  };

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  console.log("valuue is", value);

  
function valuetext(value) {
  return `Rs:${value}`;
}

const searchHotelsByPrice = () => {
  callApi({
    endPoint: `hotels/price/${value}`,
    method: "GET",
    callback: (result) => {
      if (result?.status === 200 && result?.data?.data?.length > 0) {
        setPackages(result.data.data);
      } else {
        setSearchKeyError("No results found");
        setTimeout(() => {
          setSearchKeyError(""); 
        }, 3000);

        console.error("Failed to fetch packages:", result);
      }
    },
  });

}

  return (
    <MainWrapper t={t} headerAbsolute headerFixed={false} smallHeader>
      <CustomHead schemaValue={JSON.stringify(jsonLd)} />
      {/* <div className={classes.tabs_wrapper}>
        <ScrollableTabs tabs={scrollableTabs} />
      </div> */}
     <div  className="location_input_wrapper" >
      <div className="location_input">
        <input
          placeholder="Enter location "
          onChange={(e) => setSearchKey(e.target.value)}
        />
        <span className="search_button1" onClick={searchHotels}>
          Search
        </span>
      </div>
      

      

      <Box sx={{ width: 400 }}>
        <Stack spacing={2} direction="row" sx={{ alignItems: "center", mb: 1 }}>
          <span className="price_m">1000</span>

          <Slider
            defaultValue={30}
            getAriaValueText={valuetext}
            valueLabelDisplay="auto"
            shiftStep={1000}
            step={10}
            marks
            min={1000}
            max={50000}
            aria-label="Price Range"
            value={value}
            onChange={handleChange}
            color="secondary"
          />
          <span className="price_m">50000</span>

          <span className="search_button1" onClick={() => searchHotelsByPrice()}>Search </span>
        </Stack>
      </Box>
      
      </div>
      {searchKeyError && (
  <div style={{ color: 'red', marginTop: '10px', textAlign: 'center' }}>
    {searchKeyError}
  </div>
)}
      <ContentContainer>
        {packages.length > 0 && (
          <PackageListing myPackages={packages} location={location} />
        )}
      </ContentContainer>
      {/* <ActivitiesHome router={router} /> */}
      {/* <CustomPackageUI /> */}
      {/* <HomeBlogShowcase /> */}
      {/* <Testimonial /> */}
      {/* <EnquryPackageModal
        showModal={modalData.showModal}
        backdrop={() => setModalData({ ...modalData, showModal: false })}
        onHide={() => setModalData({ ...modalData, showModal: false })}
      /> */}
    </MainWrapper>
  );
}

export const getStaticProps = async ({ locale }) => ({
  props: {
    ...(await serverSideTranslations(locale ?? "es", ["common"])),
  },
});

export default Home;
