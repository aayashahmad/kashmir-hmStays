import React, { useEffect, useRef, useState } from "react";
import {
  dontGoToMyAccountOnLoginState,
  generateOtpPending,
  isLoggedInState,
  loginDataState,
  loginLoading,
  metaDataState,
  resetPasswordPendingState,
  showLoginModalState,
  signUpLoading,
  validateOtpPendingState,
} from "../../recoil/atoms/common";
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import LoginCard from "./login-card/login-card";
import SignUpCard from "./signup-card/signup-card";
import classes from "./login-modal.module.less";
import { useRouter } from "next/router";
import KuposModal from "../kupos-modal/kupos-modal";
import CommonService from "../../services/commonService";
import MyInput from "../my-input/my-input";
import ResetPasswordCard from "./reset-passwrod-card/reset-passwrod-card";
import { callApi } from "../../services/api/callApi";
var global;

const modalInitalState = {
  showSuccessFailureModal: false,
  showSuccessFailureModalStatus: false,
  showSuccessFailureModalBodyText: "",
};

const initialState = {
  modalType: "LOGIN",
  loginType: "",
  email: "",
  loginErrorMessage: "",
  signupErrorMessage: "",
  signupCallingCode: "+56",
  signupMobile: "",
  otp1: "",
  otp2: "",
  otp3: "",
  otp4: "",
  validateOtpError: "",
  forgotMobile: "",
  selectedForgotTab: 1,
  forgotEmail: "",
  forgotEmailError: "",
  showForgotSuccess: "",
  forgotErrorMessage: "",
  successfullRegistration: false,
};

const LoginModal = props => {
  const { t } = props;

  // recoil states
  const [showLoginModal, setShowLoginModal] =
    useRecoilState(showLoginModalState);

  const [dontGoToMyAccountOnLogin, setDontGoToMyAccountOnLogin] =
    useRecoilState(dontGoToMyAccountOnLoginState);

  const setLoginLoading = useSetRecoilState(loginLoading);
  const [validateOtpPending, setValidateOtpPending] = useRecoilState(
    validateOtpPendingState,
  );
  const [otpError, setOtpError] = useState("");

  const [resetPasswordPending, setResetPasswordPending] = useRecoilState(
    resetPasswordPendingState,
  );

  const setSignUpLoading = useSetRecoilState(signUpLoading);
  const setLoginData = useSetRecoilState(loginDataState);
  const setIsLoggedIn = useSetRecoilState(isLoggedInState);
  const setGenerateOtp = useSetRecoilState(generateOtpPending);
  const metaData = useRecoilValue(metaDataState);

  // local states
  const router = useRouter();
  const [state, setState] = useState(initialState);
  const [modalState, setModalState] = useState(modalInitalState);
  const [successModal, setSuccessModal] = useState(false);
  const [oauthData, setOAuthData] = useState({});

  // this variables are here
  let idCardTypes = [];
  let backView = [];
  let oauth_token = "";
  let oAuthName = "";
  let oauth_account = "";
  let oAuthEmail = "";
  let oAuthLastName = "";

  const otp1 = useRef();
  const otp2 = useRef();
  const otp3 = useRef();
  const otp4 = useRef();

  useEffect(() => {
    if (metaData)
      for (let c in metaData.id_card_types) {
        idCardTypes.push({
          value: metaData.id_card_types[c],
          id: metaData.id_card_types[c],
          label: c,
          name: c,
          selected: metaData.id_card_types[c] == 7,
        });
      }
    resetData();
  }, []);

  const resetData = () => {
    oAuthName = "";
    oauth_account = "";
    oauth_token = "";
    oAuthEmail = "";
    oAuthLastName = "";
    setState(initialState);
    setOtpError("");
  };

  const onLogin = passedData => {

    const data = {
      country_code: passedData.country_code,
      mobile_number: passedData.mobile_number,
      cat_type: "sign_up",
    };
    generateOtp(data);
  };

  const onLoginResponse = (result, oauthData) => {
    setOAuthData(oauthData || {});
    try {
      if (result && result.token) result = CommonService.parseJwt(result.token);
      if (result && result.data && result.data.error) {
        if (state.modalType == "LOGIN-OPTIONS" && oauthData?.oauth_token) {
          backView.push(state.modalType);
          setState({
            ...state,
            modalType: "REGISTER",
            signupName: oauthData?.name,
            signupNameError: "",
            signupLastName: oauthData?.last_name,
            signupLastNameError: "",
            signupEmail: oauthData?.auth_info?.email,
            signupEmailError: "",
            signupMobile: "",
            signupMobileError: "",
            loginType: "oauth",
          });
        } else {
          setState({ ...state, loginErrorMessage: result.data.error });
          return;
        }
      } else if (result.auth_token) {
        CommonService.storeLoginDetails(result, setLoginData);
        setIsLoggedIn(true);
        setTimeout(() => {
          if (
            !CommonService.isBookingScreen() &&
            !CommonService.isATBookingScreen() &&
            !dontGoToMyAccountOnLogin
          )
            router.push("/my-account");
          setDontGoToMyAccountOnLogin(false);
          onHide();
        }, 300);
      } else {
        if (state.modalType == "LOGIN-OPTIONS" && oauthData?.oauth_token) {
          backView.push(state.modalType);
          setState({
            ...state,
            modalType: "REGISTER",
            signupName: oauthData?.name,
            signupNameError: "",
            signupLastName: oauthData?.last_name,
            signupLastNameError: "",
            signupEmail: oauthData?.auth_info?.email,
            signupEmailError: "",
            signupMobile: "",
            signupMobileError: "",
          });
        }
      }
    } catch (error) {
    } finally {
      setLoginLoading(false);
    }
  };

  // signup code ----------------------------

  const signup = payloadData => {
    if (oauthData?.oauth_account && oauthData?.oauth_type) {
      payloadData.oauth_account = oauthData?.oauth_account;
      payloadData.oauth_token = oauthData?.oauth_token;
      payloadData.oauth_type = oauthData?.oauth_type;
      payloadData.image_url = oauthData?.pic;
      payloadData.auth_info = oauthData?.auth_info;
    }
    setSignUpLoading(true);
    setState({ ...state, signupErrorMessage: "" });
  };

  const onSignupResponse = result => {
    try {
      if (result.data && result.data.error) {
        setState({ ...state, signupErrorMessage: result.data.error });
        return;
      } else if (result && result.id) {
        if (result.auth_token) {
          CommonService.storeLoginDetails(result, setLoginData);
          setIsLoggedIn(true);
          setTimeout(() => {
            if (
              !CommonService.isBookingScreen() &&
              !CommonService.isATBookingScreen() &&
              !dontGoToMyAccountOnLogin
            )
              router.push("/my-account");

            setDontGoToMyAccountOnLogin(false);
          }, 350);
        }
        setTimeout(() => {
          setState({
            ...state,
            signupName: null,
            signupEmail: null,
            signupMobile: null,
            signupPassword: null,
            signupCardNumber: null,
            successfullRegistration: true,
          });
          setSuccessModal(true);
          onHide();
        }, 300);
      }
    } catch (error) {
      alert("erroe");
    } finally {
      setSignUpLoading(false);
    }
  };

  const generateOtp = data => {
    setState({
      ...state,
      signupMobile: data.mobile_number,
      otp1: "",
      otp2: "",
      otp3: "",
      otp4: "",
    });
    setGenerateOtp(true);
    setOtpError("");
  };

  const onGenerateOtpResponse = (res, data) => {

    try {
      if (res && res.status === 200) {
        backView.push(state.modalType);
        setState({
          ...state,
          modalType: "OTP-REGISTER",
          signupMobile: data?.mobile_number,
          otp1: "",
          otp2: "",
          otp3: "",
          otp4: "",
        });
      } else if (res.message) {
        setState({
          ...state,
          signupMobileError: res.message,
          otp1: "",
          otp2: "",
          otp3: "",
          otp4: "",
        });
      }
    } catch (error) {
    } finally {
      setGenerateOtp(false);
    }
  };
  const validateOtp = ({ countryCode, mobile, type }) => {
    // if (!state.otp1 || !state.otp2 || !state.otp3 || !state.otp4) {
    //   return;
    // }
   

    let otp =`${state.otp1}${state.otp2}${state.otp3}${state.otp4}`;
    const staticOtp = "6700";

    if(otp !== staticOtp){
      setOtpError("Invalid OTP");
      return
    }

    setState({...state, modalType:"CHANGE_PASSWORD" })
  };

  const validateOtpResponse = res => {

    if (res?.status === 200 && res?.is_new_customer) {
      backView.push(state.modalType);
      setState({
        ...state,
        modalType: "REGISTER",
      });
    } else if (res?.status !== 200 && res?.message) {
      setOtpError(res?.message);
    } else if (res?.status === 200 && res?.is_new_customer === false) {
      CommonService.storeLoginDetails(res.customer, setLoginData);
      setIsLoggedIn(true);
      setTimeout(() => {
        router.push("/my-account");
        setDontGoToMyAccountOnLogin(false);
        onHide();
      }, 300);
    }

    return;
    if (res && res.status === 200) {
      backView.push(state.modalType);
      setState({
        ...state,
        modalType: "REGISTER",
      });
    } else if (res && res.status === 400) {
      setState({
        ...state,
        showSuccessFailureModal: true,
        showSuccessFailureModalStatus: false,
        validateOtpError: res?.message,
      });
    }
  };

  const renderOtpView = () => {
    return (
      <div className="login-signup-inputs row light-placeholder">
        <div className="login-signup-input  col-md-12 no-pad font11 mobile-signup-input no-border" style={{border:"none"}}>
          <div className="flex-row otp-inps">
            <input
              value={state.otp1}
              ref={otp1}
              autoCorrect={false}
              type="password"

              onKeyUp={el => {
                let key = el.keyCode || el.charCode;
              }}
              onChange={el => {
                setState({
                  ...state,
                  otp1: CommonService.phoneNumberFormat(el.target.value, 1),
                });
                if (el.target.value) otp2.current.focus();
                else otp1.current.focus();
              }}
            />
            <input
              key={state.otp2}
              value={state.otp2}
              ref={otp2}
              autoCorrect={false}
              type="password"
              onKeyUp={el => {
                let key = el.keyCode || el.charCode;
              }}
              onChange={el => {
                setState({
                  ...state,
                  otp2: CommonService.phoneNumberFormat(el.target.value, 1),
                });
                if (el.target.value) otp3.current.focus();
                else otp2.current.focus();
              }}
            />
            <input
              value={state.otp3}
              ref={otp3}
              autoCorrect={false}
              type="password"
              onKeyUp={el => {
                let key = el.keyCode || el.charCode;
              }}
              onChange={el => {
                setState({
                  ...state,
                  otp3: CommonService.phoneNumberFormat(el.target.value, 1),
                });
                if (el.target.value) otp4.current.focus();
                else otp3.current.focus();
              }}
            />
            <input
              value={state.otp4}
              ref={otp4}
              autoCorrect={false}
              type="password"
              onKeyUp={el => {
                let key = el.keyCode || el.charCode;
              }}
              onChange={el => {
                setState({
                  ...state,
                  otp4: CommonService.phoneNumberFormat(el.target.value, 1),
                });
                if (el.target.value) otp4.current.focus();
                else otp3.current.focus();
              }}
            />
          </div>
        </div>
        {otpError && (
          <div style={{ color: "red", fontSize: "12px", textAlign: "center" }}>
            {otpError}
          </div>
        )}
        <div className="errorMessageInput font8 margin-auto">
          {state.validateOtpError ? t(state.validateOtpError) : ""}
        </div>
      </div>
    );
  };

  const renderSignupOTPCard = () => {
    return (
      <div className="kupos-card log-in-card signup">
        <div
          className="back-arrow"
          onClick={() => {
            setState({ ...state, modalType: backView.pop() });
          }}
        >
          {/* close */}
        </div>

        
        <div
          style={{ marginTop: 10 }}
          className="center-text font11 light-text"
        >
          Enter 4 digit OTP.
        </div>
        {renderOtpView()}

        <div className="login-signup-button font12">
          <button className="general-button" style={{width: 200}} type="onSubmit" onClick={validateOtp}>
              <span>{"Reset Password"}</span>
          </button>
        </div>

        </div>
    );
  };

  const onForgotInputChange = (text, inp) => {
    
      setState({
        ...state,
        forgotErrorMessage: null,
        otpMobileError: null,
        forgotMobile: CommonService.phoneNumberFormat(text),
      });
    
  };

  const onForgotInputBlur = (text, inp) => {
    if (!text) {
      if (inp == "email") {
        setState({ ...state, forgotEmailError: "VALIDATIONS.VALID_EMAIL" });
      }
    } else if (inp == "email") {
      if (!CommonService.isEMailValid(text)) {
        setState({
          ...state,
          forgotEmailError: "VALIDATIONS.VALID_EMAIL_VALIDATION",
        });
      }
    }
  };

  const resetPassword = () => {
    
   
      let errorCount = 0;

      if (!state.forgotMobile) {
        setState({ ...state, otpMobileError: "Enter your phone number" });
        errorCount++;
      }
      if (state.forgotMobile && state.forgotMobile.toString().length != 10) {
        setState({
          ...state,
          otpMobileError: "Enter 10 digits phone number",
        });
        errorCount++;
      }
      if (errorCount > 0) {
        return;
      }


      callApi({
        method:"GET",
        endPoint:`auth/validate/${state.forgotMobile}`,
        callback: res => {
          console.log("res from aoi", res)
          if(res && res?.data?.data === "User Present"){
            setState({ ...state, modalType: "OTP-FORGOT" });
          }else{
            setState({ ...state, otpMobileError:res?.data?.data ?? "Not found" });
          }
        }
      })

      // generateOtpApiFunc({
      //   data: {
      //     country_code: state.signupCallingCode,
      //     mobile_number: state.forgotMobile.toString(),
      //     cat_type: "change_pwd_valid",
      //   },
      //   callback: res => {
      //     if (res && res.status === 200) {
      //       backView.push(state.modalType);
      //       setState({ ...state, modalType: "OTP-FORGOT" });
      //     } else {
      //       setState({ ...state, otpMobileError: res.message });
      //     }
      //   },
      // });
  
  };

  const onForgotResponse = result => {
    if (result.data && result.data.error) {
      setState({ ...state, forgotEmailError: result.data.error });
      return;
    } else if (result.message) {
      setState({ ...state, forgotEmail: "", showForgotSuccess: true });
    }
  };

  const renderForgotPasswordCard = () => {
    return !state.showForgotSuccess ? (
      <div className="kupos-card log-in-card forgot">
        <div
          className="back-arrow"
          onClick={() => {
            setState({
              ...state,
              modalType: backView.pop(),
              selectedForgotTab: 1,
              forgotEmail: null,
              forgotEmailError: null,
              forgotMobile: null,
              otpMobileError: null,
              forgotErrorMessage: null,
            });
          }}
        >
          
        </div>

        <div className="user-icon">
        </div>


        <br />
        {
          <div className="center-text font11 light-text">
            Enter your registered phone number
          </div>
        }

        <div className="login-signup-inputs">
         
            <div className="login-signup-input light-placeholder">
              <div
                className="login-signup-input  col-md-12 no-pad font11 mobile-signup-input"
                style={{ marginBottom: 0 }}
              >
                <MyInput
                  placeholder={"Phone number"}
                  onChange={text => onForgotInputChange(text, "forgotMobile")}
                  onBlur={text => onForgotInputBlur(text, "forgotMobile")}
                  focused={true}
                  value={state.forgotMobile}
                  inputOuterStyle={{ border: 0 }}
                />
              </div>
              <div className="errorMessageInput font8">
                {state.otpMobileError}
              </div>
            </div>
      
          {state.forgotErrorMessage ? (
            <div className="login-server-error font10 secondary-text">
              {state.forgotErrorMessage}
            </div>
          ) : null}
        </div>

        <div className="login-signup-button font12">
          <button className="general-button" style={{width: 200}} type="onSubmit" onClick={resetPassword}>
              <span>{"Change Password"}</span>
          </button>
        </div>
      </div>
    ) : (
      <div className="kupos-card log-in-card forgot-success">
        <div className="user-icon">
          <img src="/images/icons/circular-icons/icon-success.png" />
        </div>
        <div className="bold-text center-text font16">
          {"PROFILE.ALL_SET"}
        </div>
        <br />
        <div className="center-text font11 light-text">
          {"PROFILE.RESET_SENT_EMAIL"}
        </div>
        <div className="login-signup-button font12">
          <button className="kupos-button" onClick={onHide}>
            <span>{"PROFILE.OK_CONTINUE"}</span>
          </button>
        </div>
      </div>
    );
  };

  const renderForgotOTPCard = () => {
    return (
      <div className="kupos-card log-in-card signup">
        <div
          className="back-arrow"
          onClick={() => {
            setState({ ...state, modalType: backView.pop() });
          }}
        >
          {/* Close */}
        </div>
        <div className="bold-text center-text font16">
          {t("PROFILE.VERIFY_PHONE")}
        </div>
        <div
          style={{ marginTop: 10 }}
          className="center-text font11 light-text"
        >
          {t("PROFILE.VERIFY_PHONE_DESC")}
        </div>
        {renderOtpView()}
        <div className="login-signup-button font12">
          <button
            disabled={validateOtpPending}
            className="kupos-button"
            onClick={() =>
              validateOtp({
                countryCode: state.signupCallingCode,
                mobile: state.forgotMobile,
                type: "change_pwd_valid",
              })
            }
          >
            {validateOtpPending ? (
              <div className="loader-cricle"></div>
            ) : (
              <span>{t("RESULTS_PAGE.CONTINUE")}</span>
            )}
          </button>
        </div>
        <div className="register-link font10">
          <div>{t("PROFILE.NOT_RECEIVED_CODE")}</div>
          <a onClick={() => resetPassword()}>{t("PROFILE.CLICK_TO_RESEND")}</a>
        </div>
      </div>
    );
  };

  const changePassword = (resetPassword) => {


    let endPoint = `auth/rest-password/${state.forgotMobile}/${resetPassword}`
    callApi({
      method: "PUT",
      endPoint: endPoint,
      callback: res => {
        console.log("res from change api is", res)
        if(res && res.status == 200){
            router.push("/")
        }
      }
    })
   
  };

  const onHide = () => {
    resetData();
    setShowLoginModal(false);
  };

  const onLoginTypeClick = (modalType, loginType) => {
    resetData();
    setState({ ...state, modalType: modalType, loginType: loginType });
    backView.push(state.modalType);
  };

  const createAccountText = () => {
    backView.push(state.modalType);
    setState({
      ...state,
      modalType: state.loginType == "email" ? "REGISTER" : "MOBILE-REGISTER",
    });
  };

  const onForgotPasswordText = () => {
    backView.push(state.modalType);
    setState({ ...state, modalType: "FORGOT" });
  };

  const renderModalView = () => {
    switch (state.modalType) {
      case "LOGIN":
        return (
          <LoginCard
            t={t}
            loginType={state.loginType}
            onLogin={onLogin}
            createAccountText={createAccountText}
            onForgotPasswordText={onForgotPasswordText}
            backIcon={() =>
              setState({
                ...state,
                modalType: backView.pop(),
                loginErrorMessage: "",
              })
            }
            loginErrorMessage={state.loginErrorMessage}
            openCreateAccount={() => setState({ ...state, modalType: "REGISTER" })}
          />
        );
      case "REGISTER":
        return (
          <SignUpCard
            t={t}
            loginType={state.loginType}
            idCardTypes={idCardTypes}
            onSignup={signup}
            backIcon={() =>
              setState({
                ...state,
                modalType: backView.pop(),
                signupErrorMessage: "",
              })
            }
            initialState={state}
            signupErrorMessage={state.signupErrorMessage}
          />
        );
        break;

        case "FORGOT":
        return (
          renderForgotPasswordCard()
        );

        case "OTP-FORGOT":
          return(
            renderSignupOTPCard()
          );


          case "CHANGE_PASSWORD":
            return (
              <ResetPasswordCard changePassword={changePassword} backIcon={()=>{}}/>
            )


      default:
        break;
    }
  };

  return (
    <div className={classes.common_login_modal}>
      <KuposModal
        onHide={onHide}
        showModal={showLoginModal}
        size="md"
        ariaLabel="login-modal"
        backdrop={false}
      >
        <div className="login-signup-block">
          <div className="close-button pointer" onClick={onHide}>
            Close
          </div>
          {renderModalView()}
        </div>
      </KuposModal>
    </div>
  );
};

export default LoginModal;
