import { useState } from "react";
import classes from "./language-switch.module.less";
import { useRouter } from "next/router";
import { useTranslation } from "react-i18next";

const LanguageSwitch = (props) => {
  const router = useRouter();
  const { i18n } = useTranslation();

  const changeLanguage = (lang) => {
    if (typeof window !== "undefined")
      localStorage.setItem("selectedLanguage", lang);
    router.push(router.asPath, undefined, { locale: lang });
  };

  return (
    <div
      className={
        classes.language_changer_switch +
        " font10 " +
        (props.type == 1 ? classes.border : "")
      }
      key={router.locale}
    >
      <div
        onClick={() => changeLanguage("es")}
        className={
          classes.language_item +
          " " +
          (router.locale === "es" ? classes.active : "")
        }
      >
        ES
      </div>
      <div
        onClick={() => changeLanguage("en")}
        className={
          classes.language_item +
          " " +
          (router.locale === "en" ? classes.active : "")
        }
      >
        EN
      </div>
    </div>
  );
};

export default LanguageSwitch;
