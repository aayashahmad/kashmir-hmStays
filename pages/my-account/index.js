import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { useTranslation } from "next-i18next";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import MainWrapper from "../../components/wrapper/wrapper";
import { callApi } from "../../services/api/callApi";
import MyAccountHeroWrapper from "../../components/my-account/account-hero-wrapper";
import classes from "./my-account.module.less";
import ContentContainer from "../../components/content-container/content-container";
import classNames from "classnames";
import MyBookings from "../../components/my-account/my-bookings";
import CustomHead from "../../components/head";
import CustomBookings from "../../components/my-account/custom-bookings";

function Home() {
  const router = useRouter();
  const { t } = useTranslation("common");

  //state vars
  const [schemaValue, setSchemaValue] = useState([]);

  const [sections, setSections] = useState([
    { id: 0, name: "Bookings", active: true },
  ]);

  const selectItem = (item) => {
    let newSections = [];
    sections.map((section) => {
      if (section.id === item.id) {
        newSections.push({ ...section, active: !item.active });
      } else {
        newSections.push({ ...section, active: false });
      }
    });
    setSections(newSections);
  };

  // useEffect(() => {
  //   callApi({
  //     endPoint: `schema/schema_value/?ref_page=${router.pathname}`,

  //     method: "GET",
  //     callback: (result) => {
  //       if (result?.status === 200) {
  //         if (result?.data?.schema_value?.value) {
  //           setSchemaValue(result?.data?.schema_value?.value);
  //         }
  //       } else {
  //         console.log("error");
  //       }
  //     },
  //   });
  // }, []);

  return (
    <MainWrapper
      t={t}
      headerAbsolute={true}
      headerFixed={false}
      smallHeader={true}
    >
      {schemaValue && <CustomHead schemaValue={schemaValue.value} />}

      <div className={classes.my_account_root}>

        <MyAccountHeroWrapper />

        <div className={classes.rest_account_section}>
          <ContentContainer>
            <div className={classes.main_wrapper}>
              <div className={classes.bookings_container}>
                <div className={classes.left_section}>
                  <div className={classes.sections_wrapper}>
                    {sections?.map((item, index) => {
                      return (
                        <div
                          key={index}
                          className={`${classes.section_item} ${
                            item.active ? classes.active : ""
                          }`}
                          onClick={() => selectItem(item)}
                        >
                          <div
                            className={classNames({
                              [classes.menu_item]: true,
                              [classes.active_item]: item.active,
                            })}
                          >
                            {item.name}
                          </div>
                          <div className={classes.sec_menu_item}>
                            <div
                              className={classNames({
                                [classes.menu_item2]: true,
                                [classes.active_item3]: item.active,
                              })}
                            >
                              {item.name}
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
                <div className={classes.right_section}>
                  {sections[0].active && (
                    <div className={classes.bookings_wrapper}>
                      <MyBookings />
                    </div>
                  )}

                </div>
              </div>
            </div>
          </ContentContainer>
        </div>
      </div>
    </MainWrapper>
  );
}

export const getStaticProps = async ({ locale }) => ({
  props: {
    ...(await serverSideTranslations(locale ?? "es", ["common"])),
  },
});

export default Home;
