import React, { useState } from "react";
import { useRecoilValue } from "recoil";
import { generateOtpPending } from "../../../../recoil/atoms/common";
import CommonService from "../../../../services/commonService";
import KuposInput from "../../../ui/input/kupos-input";
import SvgCircularIcons from "../../../ui/svg-circular-icons/svg-circular-icons";
import SvgHome from "../../../ui/svg-home/svg-home";

const initialState = {
  signupMobile: "",
  otpMobileError: "",
  signupCallingCode: "+56",
};

const SignUpMobileCard = (props) => {
  const {t} = props;
  const [state, setState] = useState(initialState);
  const loading = useRecoilValue(generateOtpPending);

  const onSignupInputChange = (text, inp) => {
    if (inp == "mobile") {
      if (text) {
        text = CommonService.phoneNumberFormat(text);
      }
      setState({ ...state, signupMobileError: "", signupMobile: text });
    }
  };

  const onSignupInputBlur = (text, inp) => {
    if (!text) {
      if (inp == "mobile") {
        setState({
          ...state,
          signupMobileError: "VALIDATIONS.VALID_MOBILE",
        });
      }
    } else if (inp == "mobile") {
      if (state.signupMobile.toString().length != 9) {
        setState({
          ...state,
          signupMobileError: "VALIDATIONS.VALID_MOBILE_LENGTH_9",
        });
      }
    }
  };

  const onSubmit = () => {
    setState({ ...state, otpMobileError: "" });
    if (!state.signupMobile) {
      setState({
        otpMobileError: "VALIDATIONS.VALID_MOBILE",
      });
      return;
    } else if (state.signupMobile.toString().length != 9) {
      setState({
        otpMobileError: "VALIDATIONS.VALID_MOBILE_LENGTH_9",
      });
      return;
    }

    const data = {
      country_code: state.signupCallingCode || "+56",
      mobile_number: state.signupMobile,
      cat_type: "sign_up",
    };

    props.generateOtp(data);
  };

  return (
    <div className="kupos-card log-in-card signup">
      <div
        className="back-arrow"
        onClick={() => {
          props.backIcon();
          setState(initialState);
        }}
      >
        <SvgHome name="back-arrow" />
      </div>

      <div className="user-icon">
        <SvgCircularIcons name="user-orange" />
      </div>
      <div className="bold-text center-text font16">
        {t("PROFILE.SIGN_UP")}
      </div>
      <div style={{ marginTop: 10 }} className="center-text font11 light-text">
        {t("PROFILE.CREATE_ACC_PHONE")}
      </div>
      <div className="login-signup-inputs row light-placeholder">
        <div className="login-signup-input  col-md-12 no-pad font11 mobile-signup-input">
          <div className="input-flag-img">
            <img src={"/images/general/chile-flag.png"} />
          </div>
          <KuposInput
            placeholder={t("PROFILE.ENTER_PHONE")}
            t={t}
            onChange={(text) => onSignupInputChange(text, "mobile")}
            onBlur={(text) => onSignupInputBlur(text, "mobile")}
            focused={true}
            value={state.signupMobile}
            type={"number"}
          />
        </div>
        <div className="errorMessageInput font8">
          {state.otpMobileError ? t(state.otpMobileError) : (props.otpMobileError || "")}
        </div>
      </div>
      <div className="login-signup-button font12">
        <button disabled={loading} className="kupos-button" onClick={onSubmit}>
          {loading ? (
            <div className="loader-cricle"></div>
          ) : (
            <span>{t("PROFILE.SIGN_UP")}</span>
          )}
        </button>
      </div>
      <div className="register-link font10">
        <span>{t("PROFILE.ALREADY_ACCOUNT")}</span>&nbsp;
        <a
          onClick={() => {
            props.backIcon();
          }}
        >
          {t("PROFILE.LOG_IN")}
        </a>
      </div>
    </div>
  );
};

export default SignUpMobileCard;
