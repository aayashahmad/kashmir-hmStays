
import classes from "./account-hero-wrapper.module.less";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { loginDataState } from "../../../recoil/atoms/common";
import ContentContainer from "../../content-container/content-container";
import ImageWithFallback from "../../image-with-fallback";
const MyAccountHeroWrapper = () => {
  //recoil states
  const loginData = useRecoilValue(loginDataState);
  const setLoginData = useSetRecoilState(loginDataState);
  const Logout = () => {
    setLoginData(null);
    window.location.href = "/";
  };
  return (
    <div className={classes.hero_wrapper_root}>
      {/* <ImageWithFallback
        className="background_img"
        src="/images/banner3.jpg"
        alt="hero"
        fill
      /> */}


      <img  className="background_img"  src="/images/banner3.jpg"/>


      <div className={classes.overlay_wrapper}>
        <ContentContainer>
          <div className={classes.overlay_content}>
            <img
              src="/images/icons/logout.png"
              alt="logout"
              onClick={() => Logout()}
              style={{
                height: "30px",
                position: "absolute",
                right: "10px",
                top: "10px",
                cursor: "pointer",
              }}
            />
            <div className={classes.overlay_content_name}>
              Welcome back{" "}
              <span className="bold-text">{loginData?.data?.first_name}</span>
            </div>
            <div className={classes.overlay_content_description}>
              <div className={classes.overlay_content_description_bold}>
                {loginData?.data?.first_name} {loginData?.data?.last_name}
              </div>
            </div>
            <div>
              <div className={classes.overlay_content_description}>
                <div className={classes.overlay_content_description_bold}>
                  {loginData?.data?.email}
                </div>
              </div>
              <div className={classes.overlay_content_description}>
                <div className={classes.overlay_content_description_bold}>
                  {String(loginData?.data?.mobile ?? "NA")}
                </div>
              </div>
              <div className={classes.overlay_content_description}>
                <div className={classes.overlay_content_description_bold}>
                  {loginData?.data?.role}
                </div>
              </div>
            </div>
          </div>
        </ContentContainer>
      </div>
    </div>
  );
};

export default MyAccountHeroWrapper;
