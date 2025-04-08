import * as React from "react";
import Box from "@mui/material/Box";
import SwipeableDrawer from "@mui/material/SwipeableDrawer";
import { Menu, Close } from "@mui/icons-material";
import { useRouter } from "next/router";
import { useRecoilValue, useSetRecoilState } from "recoil";
import {
  customPackageModalState,
  loginDataState,
  showLoginModalState,
} from "../../../recoil/atoms/common";
import classes from "./hamburger.module.less";
import Image from "next/image";

export default function MobileMenu() {
  const router = useRouter();
  const setShowLoginModal = useSetRecoilState(showLoginModalState);
  const setcustomPackageModal = useSetRecoilState(customPackageModalState);

  const [state, setState] = React.useState({ left: false });
  const loginData = useRecoilValue(loginDataState);

  const toggleDrawer = (anchor, open) => (event) => {
    if (
      event &&
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }
    setState({ ...state, [anchor]: open });
  };

  const menuItems = [
    { id: 0, title: "Home", screen: "/" },
    { id: 1, title: "Login", screen: "" },
    { id: 2, title: "Blogs", screen: "blogs" },
    { id: 4, title: "Book Cabs", screen: "cars" },
    { id: 6, title: "Custom package", screen: "custom_package" },
    { id: 8, title: "Contact us", screen: "contact-us" },
  ];

  const onMenuItemClick = (menuItem) => {
    setState({ left: false });
    if (menuItem.title === "Login") {
      setShowLoginModal(true);
      return;
    }
    if (menuItem.title === "Custom package") {
      setcustomPackageModal(true);
      return;
    }
    router.push(menuItem.screen);
  };

  return (
    <div className={classes.mobile_navigation_container}>
      <div className={classes.mobile_menu_nav_bar}>
        <Image
          className={classes.mobile_logo}
          src="/images/about-images/kashmirNiravanlogo.png"
          onClick={() => router.push("/")}
          alt="Logo"
          width={100}
          height={100}
        />
        <div
          className={classes.mobile_menu}
          onClick={toggleDrawer("left", !state["left"])}
        >
          {state["left"] ? (
            <Close style={{ color: "#444", fontSize: 34 }} />
          ) : (
            <Menu style={{ color: "#444", fontSize: 34 }} />
          )}
        </div>
      </div>
      <SwipeableDrawer
        anchor={"left"}
        open={state["left"]}
        onClose={toggleDrawer("left", false)}
        onOpen={toggleDrawer("left", true)}
      >
        <Box
          sx={{ width: 250 }}
          role="presentation"
          onClick={toggleDrawer("left", false)}
          onKeyDown={toggleDrawer("left", false)}
        >
          <div className={classes.mobile_menu_wrapper}>
            <div className={classes.mobile_menu_header}>
              <Image
                className={classes.mobile_logo}
                src="/images/about-images/logo76-removebg-preview.png"
                onClick={() => router.push("/")}
                alt="Logo"
                width={100}
                height={100}
              />
              <div
                className={classes.mobile_menu}
                onClick={toggleDrawer("left", false)}
              >
                <Close style={{ color: "white", fontSize: 34 }} />
              </div>
            </div>
            {menuItems.map((menuItem) => (
              <div
                className={classes.menu_item_wrapper}
                onClick={() => onMenuItemClick(menuItem)}
                key={menuItem.id}
              >
                {menuItem?.id === 1 && loginData?.data?.id ? <span className={classes.menu_item} >My Account</span> : <span className={classes.menu_item} style={{ cursor: "pointer" }}>
                  {menuItem.title}
                </span>}
              </div>
            ))}
          </div>
        </Box>
      </SwipeableDrawer>
    </div>
  );
}
