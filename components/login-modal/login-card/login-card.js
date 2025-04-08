import React, { useState } from "react";
import {  useRecoilValue, useSetRecoilState } from "recoil";
import { loadingState, loginDataState, showLoginModalState, successErrorModalState } from "../../../recoil/atoms/common";
import MyInput from "../../my-input/my-input";
import baseUrls from "../../../services/constants/baseUrls";
import { useRouter } from "next/router";
import SvgHome from "../../svg-home/svg-home";
import KuposCheckbox from "../../UI/checkbox/kupos-checkbox";

const initialState = {
  email: "",
  emailError: "",
  password: "",
  rememberMe: false,
};

const LoginCard = (props) => {
  const { t } = props;
  const [state, setState] = useState(initialState);

  const router = useRouter();

  //recoil states
  const loading = useRecoilValue(loadingState);
  const setLoginData = useSetRecoilState(loginDataState);
  const setSuccessErrorModalValues = useSetRecoilState(successErrorModalState)
  const setShowLoginModal = useSetRecoilState(showLoginModalState);


  const onLoginInputChange = (text, inp) => {
    if (inp == "email") {
      setState({
        ...state,
        emailError: "",
        email: text
      });
    } else if (inp == "password") {
      setState({ ...state, passwordError: null, password: text });
    }
  };

  const onLoginInputBlur = (text, inp) => {
    if (!text) {
      if (inp == "email") {

        setState({
          ...state,
          emailError: "Enter your email/username",
        });
      } else if (inp == "password") {
        setState({
          ...state,
          passwordError: "Enter your password",
        });
      }
    }
  };

  const createAccount = () => {
    setState(initialState);
    props.openCreateAccount();
  };

  const submitForgotPassword = () => {
    setState(initialState);
    props.onForgotPasswordText();
  };

  const onLogin = async (e) => {
    e.preventDefault();
    let errorCount = 0;

    if (!state.email) {
      setState({ ...state, emailError: "Please enter your email" });
    }

    if (!state.password) {
      setState({ ...state, emailError: "Please enter your password" });
    }

    if (errorCount > 0) {
      return;
    }


    const formData = new FormData();
    formData.append("username", state.email);
    formData.append("password", state.password);

    fetch(baseUrls.baseUrl + 'auth/token', {
      method: 'POST',
      body: formData,
    }).
      then(response => response.json()).
      then(data => {

        if (data?.access_token) {
          setLoginData(data)
          let jsonData = JSON.stringify(data)
          localStorage.setItem("logindata", window.btoa(jsonData))
          setShowLoginModal(false)

          setSuccessErrorModalValues({
            showModal: true, success: true, modalTitle: "Success", modalBody: "Login Successful",
            onButtonClick: () => {
              setSuccessErrorModalValues({})
              router.push("/my-account")
            }
          })

        } else {
          setSuccessErrorModalValues({ showModal: true, success: false, modalTitle: "Failure", modalBody: data?.detail ?? "Login Successful", })
        }
      }).catch(error => {
        console.log("error", error)
      })
  };

  return (
    <div className="kupos-card log-in-card ">
      <div className="back-arrow" onClick={props.backIcon}>
        <SvgHome name="back-arrow" />
      </div>
      <div className="user-icon">
        {/* <SvgCircularIcons name="user-orange" /> */}
      </div>
      <div className="bold-text text-center font16">
        {"Login to your account"}
      </div>

      <div style={{ marginTop: 10 }} className="text-center font11 light-text">
        Enter your email and password
      </div>

      <form onSubmit={onLogin}>
        <div className="login-signup-inputs">

          <div className="login-signup-input font11">
            <MyInput
              className="kupos-border light-placeholder"
              placeholder={"Email"}
              type={"email"}
              onChange={(text) => onLoginInputChange(text, "email")}
              onBlur={(text) => onLoginInputBlur(text, "email")}
              value={state.email}
              error={state.emailError ? true : false}
              errorMessage={state.emailError ? state.emailError : ""}
            />
          </div>

          <div className="login-signup-input font11">
            <MyInput
              className="kupos-border light-placeholder"
              placeholder={"Password"}
              type={"password"}
              onChange={(text) => onLoginInputChange(text, "password")}
              onBlur={(text) => onLoginInputBlur(text, "password")}
              value={state.password}
              error={state.passwordError ? true : false}
              errorMessage={
                state.passwordError ? state.passwordError : ""
              }
            />
          </div>
          {props.loginErrorMessage ? (
            <div className="login-server-error font10 secondary-text">
              {props.loginErrorMessage}
            </div>
          ) : null}
        </div>

        <div className="login-terms flex-row font10">
          <span>
            <KuposCheckbox
              label="remember me"
              checked={state.rememberMe}
              onChange={() =>
                setState({ ...state, rememberMe: !state.rememberMe })
              }
            />
          </span>
          <a onClick={submitForgotPassword} className="primary-text">
            {"Forgot Password?"}
          </a>
        </div>

        <div className="login-signup-button font12">
          <button disabled={loading} className="general-button" type="onSubmit">
            {loading ? (
              <div className="loader-cricle"></div>
            ) : (
              <span>{"Log in"}</span>
            )}
          </button>
        </div>
      </form>

      <div className="register-link font10">
        <span>{"Don't have an account?"}</span>&nbsp;
        <a
          onClick={createAccount}>
          {("Register Now!")}
        </a>
      </div>
    </div>
  );
};

export default LoginCard;
