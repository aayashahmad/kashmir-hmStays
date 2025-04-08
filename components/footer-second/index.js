import React from "react";
import classes from "./footer-second.module.less";
import { useRouter } from "next/router";
import { useRecoilValue } from "recoil";
import { metaDataState } from "../../recoil/atoms/common";
import FacebookIcon from "@mui/icons-material/Facebook";
import InstagramIcon from "@mui/icons-material/Instagram";
import TwitterIcon from "@mui/icons-material/Twitter";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import YouTubeIcon from "@mui/icons-material/YouTube";
import Link from "next/link";
import ImageWithFallback from "../image-with-fallback";

const FooterSecond = () => {
  const router = useRouter();
  const metaData = useRecoilValue(metaDataState);

  const gotoHome = () => {
    router.push("/");
  };

  const goToAbout = () => {
    router.push("/about-us");
  };
  const goToTermsAndConditions = () => {
    router.push("/terms-and-conditions");
  };

  const goToPrivacyPolicies = () => {
    router.push("/privacy-policies");
  };

  const goToDestinations = () => {
    router.push("/destinations");
  };

  const goToBlogs = () => {
    router.push("/blogs");
  };

  const gotoSpecialCabs = () => {
    router.push("/cars");
  };

  const gotoContactUS = () => {
    router.push("/contact-us");
  };

  const goToActivites = () => {
    router.push("/activities");
  };

  const callDoctor = () => {
    const phone = metaData.phone ;
    if (phone) {
      window.open(`tel:${phone}`);
    } else {
      console.log("No phone number provided");
    }
  };

  return (
    <div className={classes.footersecond_parent}>
      <div className={classes.overlay}>
        <div className={classes.footersecond_overlay}>
          <div className={classes.footersecond_links}>
            <span className={classes.bolder_links}>
              {"Legal Representation:"}
            </span>
            {metaData && (
              <div className={classes.links}>
                <span>{metaData.address}</span>
                <div className={classes.footer_item}>
                  <span className={classes.bolder_links}>Support</span>
                  <span onClick={callDoctor} >{metaData.phone}</span>
                  {/* <span>{metaData.email}</span> */}
                  
                </div>
              </div>
            )}
          </div>
          <div className={classes.footersecond_links}>
            <span className={classes.bolder_links}>
              Kashmir HomeStays Special
            </span>
            <div className={classes.links}>
            {/* <span onClick={gotoSpecialCabs}>Book a Cab</span> */}
              {/* <span onClick={goToDestinations}>Destinations</span> */}
              <span onClick={goToBlogs}>Blogs</span>
              {/* <span onClick={goToActivites}>Activites</span>
     */}
            </div>
          </div>
          <div className={classes.footersecond_links}>
            <span className={classes.bolder_links}>About Us</span>
            <div className={classes.links}>
              <span onClick={goToAbout}>About us</span>
              <span onClick={gotoContactUS}>Contact Us</span>
              <span onClick={goToTermsAndConditions}>Terms and Conditions</span>
              <span onClick={goToPrivacyPolicies}>Privacy Policies</span>
            </div>
          </div>
        </div>
      </div>

      <div className={classes.white_line_parent}>
        <div className={classes.middle_white_line}>
          <div className={classes.footer_image}>
            <ImageWithFallback
              onClick={gotoHome}
              src="/images/logo76-removebg-preview.png"
              alt={"footer logo"}
              width={300}
              height={80}
              style={{ cursor: "pointer" }}
            />
          </div>
        </div>
      </div>
      <div className={classes.icons_parent}>
        {metaData && (
          <div className={classes.footer_icons}>
            <Link href={metaData.facebook}>
              <FacebookIcon className={classes.link1} />
            </Link>
            <Link href={metaData.instagram}>
              {" "}
              <InstagramIcon className={classes.link2} />
            </Link>
            <Link href={metaData.twitter}>
              {" "}
              <TwitterIcon className={classes.link3} />
            </Link>
            <Link href={metaData.linkedin}>
              {" "}
              <LinkedInIcon className={classes.link4} />
            </Link>
            <Link href={metaData.youtube}>
              <YouTubeIcon className={classes.link5} />
            </Link>
          </div>
        )}
      </div>
      <div className={classes.about_footer}>
        <span>© 2024 kashmirHomeStays.com All rights reserved.</span>
      </div>
    </div>
  );
};

export default FooterSecond;
