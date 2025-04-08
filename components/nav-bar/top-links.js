import { useEffect, useState } from "react";
import React from "react";
import styles from "./top-links.module.less";
import { useRouter } from "next/router";
import { customPackageModalState, showLoginModalState } from "../../recoil/atoms/common";
import { useRecoilState, useSetRecoilState } from "recoil";

const dropDownIconPath = "/images/navbar/dropdown-icons/";

const navbarLinks = [
  {
    id: 0,
    title: "Top Destinations",
    link: "top-deals",
  },
  {
    id: 1,
    title: "Cars",
    link: "cars",

  },
  {
    id: 2,
    title: "Blogs",
    link: "blogs"
  },
  {
    id: 3,
    title: "User",
    image: "/images/icons/user.png",
  },

];

const initialState = {
  navbarPopup: null,
};

const TopLinks = ({ t, headerFixed }) => {
  const router = useRouter();

  //recoil states
  const setShowLoginModal = useSetRecoilState(showLoginModalState);
  const setcustomPackageModal = useSetRecoilState(customPackageModalState);

  const [{ navbarPopup }, setState] = useState(initialState);

  const onLinkClick = link => {

    if (link?.title == "Login") {
      setShowLoginModal(true)

      return

    }


    if (link?.title === "Custom Package") {
      setcustomPackageModal(true)

      return

    }

    if (!link.dropDown) {
      router.push(link?.link || "/");

    }
    else onLinkClick(link);

  };

  useEffect(() => {
    window.addEventListener("scroll", () => {
      if (navbarPopup) {
        setState(prevData => ({ ...prevData, navbarPopup: null }));
      }
    });
  });

  return (
    <div className={styles.links_wrapper}>
      {navbarLinks.map((link, index) => (
        <div className="relative" key={index}>
          {link.image ? (
            <div style={{paddingLeft:"14px"}}>
              <img src={link.image} alt=""  />
            </div>
          ) : (
            <div
              className={`${styles.link} navlink-wrapper`}
              id={link.id}
              onClick={() => onLinkClick(link)}
            >
              <p
                className={`${styles.link_title} ${headerFixed ? styles.link_title_header_fixed : ""
                  }`}
              >
                {link.title}
              </p>
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default TopLinks;
