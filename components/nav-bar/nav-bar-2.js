import {
  cancellationModalState,
  isLoggedInState,
  loginDataState,
  showLoginModalState,
} from "../../recoil/atoms/common";
import { useEffect, useState } from "react";
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";

import ContentContainer from "../content-container/content-container";
import Image from "next/image";
import TopLinks from "./top-links";
import classNames from "classnames";
import classes from "./nav-bar-2.module.less";
import { useRouter } from "next/router";
import LoginModal from "../login-modal/login-modal";

const NavBar2Component = (props) => {
  const { t } = props;

  const router = useRouter();

  const [showAccDropdown, setShowAccDropdown] = useState(false);
  const [openCancellationModal, setOpenCancellationModal] = useRecoilState(
    cancellationModalState
  );
  const isLoggedIn = useRecoilValue(isLoggedInState);
  const loginData = useRecoilValue(loginDataState);
  const setShowLoginModal = useSetRecoilState(showLoginModalState);
  const [hideNavLinks, setHideNavLinks] = useState(false);

  useEffect(() => {
    const pathname = router.pathname;
    if (pathname.includes("pasajes-bus") || pathname.includes("bus-tickets")) {
      setHideNavLinks(true);
    }
  }, []);

  useEffect(() => {
    if (typeof window !== "undefined") {
      var lastScrollTop = 0;
      window.addEventListener("scroll", () => {
        let d = document.getElementsByClassName("nav-child-container")[0];
        if (d) {
          let hasClass = d.classList.contains("nav-child-hidden");
          if (window.pageYOffset > 100 && !hasClass) {
            d.classList.add("nav-child-hidden");
          } else if (window.pageYOffset < 10 && hasClass) {
            d.classList.remove("nav-child-hidden");
          }
        }
      });
    }
  });

  const renderMyAccountDropdown = () => {};
  return (
    <>
      <nav
        className={classNames({
          [classes.main_nav_container]: true,
          [classes.main_nav_container_fixed_header]: props.headerFixed,
          [classes.main_nav_container_absolute_header]: props.headerAbsolute,
        })}
      >
        <div className={classes.nav_container + " content-container"}>
          <div className={classes.logo}>
            <a href={"/" + router.locale}>
              <Image
                loader={""}
                src="/images/turbus/Turbus-website-home-footer- logo.svg"
                alt="turbus.cl"
                height={80}
                width={200}
                className="pointer"
                priority={false}
                style={{
                  width: props.logoWidth ? props.logoWidth : 200,
                }}
              />
            </a>
          </div>

          <div className={classes.links_container + " font10"}>
            <ul>
              {!hideNavLinks ? (
                <TopLinks t={t} headerFixed={props.headerFixed} />
              ) : null}
              <li>
                <div className="my-account-top font10">
                  <a
                    onClick={() =>
                      isLoggedIn
                        ? router.push("/my-account")
                        : setShowLoginModal(true)
                    }
                  >
                    <div
                      className={
                        "menu-profile-icon-stripe circular-icon-stripe profile-circular-icon"
                      }
                    >
                      <img
                        alt="profile pic"
                        src={
                          isLoggedIn && loginData?.image_link
                            ? loginData.image_link
                            : "/images/icons/Unregistered-user.svg"
                        }
                        width="42px"
                        height="42px"
                      />
                    </div>
                  </a>
                  {showAccDropdown ? renderMyAccountDropdown(t) : null}
                </div>
              </li>
              {/* <li>
				  <LanguageSwitch
					type={props.headerFixed}
					history={props.history}
				  />
				</li> */}
            </ul>
          </div>
        </div>
        <ContentContainer
          classNames={["nav-child-container", classes.nav_child_container]}
        >
          {props.children}
        </ContentContainer>
      </nav>
      <LoginModal />
    </>
  );
};

export default NavBar2Component;
