import React, { useState } from "react";
import SvgCircularIcons from "../../../ui/svg-circular-icons/svg-circular-icons";
import FacebookLogin from "react-facebook-login";
import { GoogleLogin } from "react-google-login";
import AppData from "../../../../services/appData";
import KuposModal from "../../../ui/kupos-modal/kupos-modal";
import SvgHome from "../../../ui/svg-home/svg-home";
import TermsAndConditions from "../../../ui/terms-and-conditions/terms-and-conditions";
import { LoginV2 } from "../../../../services/apis/apisPB";
import CommonService from "../../../../services/commonService";

const initialState = {
  showTNCModel: false,
};
const LoginOptions = (props) => {
  const { t } = props;
  const [state, setState] = useState(initialState);

  const toggleTnCModal = () => {
    setState({ ...state, showTNCModel: !state.showTNCModel });
  };

  const loginApiFunc = LoginV2();

  const loginResponseFacebook = (res) => {
    let oauth_account = null;
    let oauth_token = null;
    let oAuthLogin = false;
    if (res.email) {
    }
    oAuthLogin = true;
    let oAuthType = "facebook";
    oauth_account = res.userID;
    oauth_token = res.accessToken;
    let facebookData = res;
    if (res.first_name) {
      let oAuthName = res.first_name.trim();
    }
    if (res.last_name || res.middle_name) {
      let oAuthLastName =
        (res.middle_name || "").trim() + " " + (res.last_name || "").trim();
    }
    let oAuthEmail = res.email;
    if (res.picture && res.picture.data) {
      let oAuthPic = res.picture.data.url;
    }
    let data = {
      email: state.email,
      password: state.password,
    };
    data.oauth_account = oauth_account;
    data.oauth_token = oauth_token;
    data.oauth_type = oAuthType;
    data.auth_info = { email: oAuthEmail };
    if (oauth_account) {
      loginApiCall(data);
    }
  };

  const responseGoogle = (res) => {
    let oauth_account = null;
    let oauth_token = null;
    let oAuthLogin = false;
    let oAuthType = "google";
    let oAuthName = "";
    let oAuthLastName = "";
    let oAuthPic = null;
    let oAuthEmail = res.profileObj.email;
    if (res.profileObj) {
      oauth_account = res.googleId;
      oauth_token = res.tokenId;
      oAuthLogin = true;
      oAuthType = "google";
      oAuthName = res.profileObj.givenName;
      oAuthLastName = res.profileObj.familyName;
      oAuthEmail = res.profileObj.email;
      oAuthPic = res.profileObj.imageUrl;
      localStorage.setItem("googleAccessToken", res.accessToken);
    }

    let data = {
      email: state.email,
      password: state.password,
    };
    data.oauth_account = oauth_account;
    data.oauth_token = oauth_token;
    data.oauth_type = oAuthType;
    data.name = oAuthName;
    data.last_name = oAuthLastName;
    data.pic = oAuthPic;
    data.auth_info = { email: oAuthEmail };
    if (oauth_account) {
      loginApiCall(data);
    }
  };

  const loginApiCall = (data) => {
    loginApiFunc({
      data: {},
      callback: (res) => props.onLoginResponse(res, data),
      headers: [
        { key: "x-param-token", value: CommonService.createJwtFull(data) },
      ],
    });
  };

  return (
    <div className="kupos-card log-in-card ">
      <div className="user-icon">
        <SvgCircularIcons name="user-orange" />
      </div>
      <div className="bold-text center-text font16">
        {t("PROFILE.NEW_LOG_IN_HEADING")}
      </div>

      <div className="center-text font11 light-text" style={{ marginTop: 10 }}>
        {t("PROFILE.LOGIN_MESSAGE1")}
        <span className="bold-text pointer" onClick={toggleTnCModal}>
          {" "}
          {t("PROFILE.LOGIN_MESSAGE2")}
        </span>
        {t("PROFILE.LOGIN_MESSAGE3")}
        <span className="bold-text pointer" onClick={toggleTnCModal}>
          {t("PROFILE.LOGIN_MESSAGE4")}
        </span>
      </div>

      <div className="login-signup-inputs">
        <div
          className="login-signup-button option-buttons font12 "
          style={{ position: "relative" }}
        >
          <button
            className="kupos-button login_option-button facebook"
          >
            <div className="inner-button-login-options">
              <div
                style={{
                  width: 30,
                  display: "flex",
                  justifyContent: "center",
                }}
              >
                <img src="/images/login/fb.png" />
              </div>
              <span>{t("PROFILE.FACEBOOK_LOGIN")}</span>
            </div>
          </button>
          <span className="hidden-fb-login-button">
            <FacebookLogin
              appId={AppData.FB_APP_ID}
              fields="name,email,picture.height(400),first_name,middle_name,last_name"
              autoLoad={false}
              callback={loginResponseFacebook}
            />
          </span>
        </div>

        <div className="login-signup-button option-buttons font12 relative ">
          <button
            className="kupos-button login_option-button google"
          >
            <div className="inner-button-login-options">
              <div
                style={{
                  width: 30,
                  display: "flex",
                  justifyContent: "center",
                }}
              >
                <img src="/images/login/google_reg.png" />
              </div>
              <span>{t("PROFILE.GOOGLE_LOGIN")}</span>
            </div>
          </button>
          <span className="hidden-fb-login-button">
            <GoogleLogin
              clientId="730867902568-lif64blhv270832luvpfaln2ll76u5gm.apps.googleusercontent.com"
              autoLoad={false}
              onSuccess={responseGoogle}
              onFailure={responseGoogle}
              cookiePolicy={"single_host_origin"}
              redirectUri="postmessage"
            />
          </span>
        </div>
        <div className="login-signup-button option-buttons font12">
          <button
            className="kupos-button login_option-button"
            onClick={() => {
              props.onLoginTypeClick("LOGIN", "mobile");
            }}
          >
            <div className="inner-button-login-options">
              <div
                style={{
                  width: 30,
                  display: "flex",
                  justifyContent: "center",
                }}
              >
                <img src="/images/login/phone-text.png" />
              </div>
              <span>{t("PROFILE.PHONE_LOGIN")}</span>
            </div>
          </button>
        </div>
      </div>
      <KuposModal
        ariaLabel="tncmodal"
        size={"xl"}
        onHide={toggleTnCModal}
        showModal={state.showTNCModel}
      >
        <div className="tnc-pnr-modal">
          <TermsAndConditions modal />
          <div className="close-button pointer" onClick={toggleTnCModal}>
            <SvgHome name="close" />
          </div>
        </div>
      </KuposModal>
    </div>
  );
};

export default LoginOptions;
