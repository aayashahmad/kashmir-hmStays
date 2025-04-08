import React, { useState } from "react";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { loadingState, showLoginModalState, successErrorModalState } from "../../../recoil/atoms/common";
import CommonService from "../../../services/commonService";
import classes from "./signup-card.module.less";
import MyInput from "../../my-input/my-input";
import SvgHome from "../../svg-home/svg-home";
import KuposCheckbox from "../../UI/checkbox/kupos-checkbox";
import { callApi } from '../../../services/api/callApi'
import { useRouter } from "next/router";
import Tabs from "../../tabs/tabs";

const SignUpCard = (props) => {

  const router = useRouter();
  const { t } = props;
  const [state, setState] = useState({});


  const [selectedTab, setSelectedTab] = useState("Customer") 

  const [inputValues, setInputValues] = useState({});
  const loading = useRecoilValue(loadingState);
  const setSuccessErrorModalValues = useSetRecoilState(successErrorModalState)
  const setShowLoginModal = useSetRecoilState(showLoginModalState);

  // const onChange = (text, type) => {
  //   let error = `${type}Error`;
  //   setInputValues({ ...inputValues, [type]: text, [error]: null });
  // };

  // const onBlur = (text, type) => {
  //   if (!text) {
  //     let error = `${type}Error`;
  //     setInputValues({ ...inputValues, [error]: "Enter your " + type });
  //   }
  // }
  const onChange = (text, type) => {
    let error = `${type}Error`;
  
    // Clear error on change and set the new value
    setInputValues({ 
      ...inputValues, 
      [type]: text, 
      [error]: null // Clear error on typing
    });
  };
  
  const onBlur = (text, type) => {
    let error = `${type}Error`;
  
    // Check if the field is empty
    if (!text) {
      setInputValues({ 
        ...inputValues, 
        [error]: "Enter your " + type 
      });
    }
  
    // If the field is 'mobile', validate length of the phone number
    if (type === "mobile" && text) {
      if (text.length !== 10) {
        setInputValues({ 
          ...inputValues, 
          [error]: "Phone number must be exactly 10 digits long" 
        });
      }
    }
  };
  

  const isSignupValid = () => {

    let errors = 0;

    let localInputs = { ...inputValues };

    if (!localInputs.first_name) {
      localInputs.first_nameError = "Enter your first name";
      errors++;
    }

    if (!localInputs.last_name) {
      localInputs.last_nameError = "Enter your last name";
      errors++;
    }

    if (!localInputs.email) {
      localInputs.emailError = "Enter your email";
      errors++;
    } else if (!CommonService.isEMailValid(localInputs.email)) {
      localInputs.emailError = "Enter a valid email";
      errors++;
    }

    if (!localInputs.mobile) {
      localInputs.mobileError = "Enter your mobile number";
      errors++;
    }

    if (!localInputs.password) {
      localInputs.passwordError = "Enter your password";
      errors++;
    }

    if (!localInputs.confirm_password) {
      localInputs.confirm_passwordError = "Enter your confirm password";
      errors++;
    } else if (localInputs.confirm_password !== localInputs.password) {
      localInputs.confirm_passwordError = "Password does not match";
      errors++;
    }

    if (!state.acceptTNC) {
      setState({
        ...state,
        termsAndCondionsError: "Please accept terms and conditions",
      });
    }


    setInputValues(localInputs);

    if (errors > 0) {
      return false
    }

    return true;

  };


  const signup = () => {
    if (!isSignupValid()) {
      return;
    }

    let data = {
      "email": inputValues.email,
      first_name: inputValues.first_name,
      last_name: inputValues.last_name,
      "password": inputValues.password,
      "mobile": inputValues.mobile,
      "role": selectedTab === "Owner"? "hotel" :"user",
      "username": inputValues.email,
    }

    callApi({
      endPoint: "auth/",
      method: "POST",
      callback: (result) => {
        setShowLoginModal(false);

        if (result?.status === 201) {
          setSuccessErrorModalValues({
            showModal: true, success: true, modalTitle: "Success", modalBody: "Account created Successfully",
            onButtonClick: () => {
              setSuccessErrorModalValues({})
              router.push("/")
            }
          })

        } else {
          setSuccessErrorModalValues({
            showModal: true, success: false, modalTitle: "Failure", modalBody: "There is some error creating your account",
            onButtonClick: () => {
              setSuccessErrorModalValues({})
              router.push("/")
            }
          })
          console.log("error")
        }
      },
      data: data
    });
  };

  const onSubmitBackIcon = () => {
    setState(initialState);
    props.backIcon();
  };
  console.log("Log__ selectedTab", selectedTab)
  return (
    <div className="kupos-card log-in-card signup">
      <div className="back-arrow" onClick={onSubmitBackIcon}>
        <SvgHome name="back-arrow" />
      </div>


      <Tabs data={["Customer", "Owner"]} selectedTab={selectedTab} onTabChange ={(i)=> setSelectedTab(i)} />

      <div className="bold-text center-text font16">
        {"Create Account "+ selectedTab}
      </div>

      <div className={classes.row}>
        <MyInput
          className="kupos-border"
          placeholder={"First name"}
          onChange={(text) => onChange(text, "first_name")}
          onBlur={(text) => onBlur(text, "name")}
          value={inputValues.first_name}
          error={inputValues.first_nameError ? true : false}
          errorMessage={inputValues.first_nameError ? inputValues.first_nameError : ""}
        />
        <div className="gap20"></div>

        <MyInput
          className="kupos-border"
          placeholder={"Last name"}
          onChange={(text) => onChange(text, "last_name")}
          onBlur={(text) => onBlur(text, "name")}
          value={inputValues.last_name}
          error={inputValues.last_nameError ? true : false}
          errorMessage={inputValues.last_nameError ? inputValues.last_nameError : ""}
        />
      </div>

      <MyInput
        className="kupos-border"
        placeholder={"Email"}
        type={"email"}
        requred
        onChange={(text) => onChange(text, "email")}
        onBlur={(text) => onBlur(text, "email")}
        value={inputValues.email}
        error={inputValues.emailError ? true : false}
        errorMessage={
          inputValues.emailError ? inputValues.emailError : ""
        }
      />

      <MyInput
        className="kupos-border"
        placeholder={"Phone number"}
        onChange={(text) => onChange(text, "mobile")}
        onBlur={(text) => onBlur(text, "mobile")}
        focused={true}
        type={"number"}
        requred
        value={inputValues.mobile}
        error={inputValues.mobileError ? true : false}
        errorMessage={
          inputValues.mobileError ? inputValues.mobileError : ""
        }
      />

      <div className={classes.row}>
        <MyInput
          className="kupos-border"
          type="password"
          t={t}
          placeholder={"Password"}
          onChange={(text) => onChange(text, "password")}
          onBlur={(text) => onBlur(text, "password")}
          value={inputValues.password}
          error={inputValues.passwordError ? true : false}
          errorMessage={
            inputValues.passwordError ? inputValues.passwordError : ""
          }
        />
        <div className="gap20"></div>
        <MyInput
          className="kupos-border"
          type="password"
          t={t}
          placeholder={"Confirm password"}
          onChange={(text) => onChange(text, "confirm_password")}
          onBlur={(text) => onBlur(text, "confirm_password")}
          value={inputValues.confirm_password}
          error={inputValues.confirm_passwordError ? true : false}
          errorMessage={
            inputValues.confirm_passwordError
              ? inputValues.confirm_passwordError
              : ""
          }
        />
      </div>
      

      <div className="login-terms flex-row font10">
        <span className="flex-row align-center">
          <KuposCheckbox
            checked={state.acceptTNC}
            onChange={() =>
              setState({
                ...state,
                acceptTNC: !state.acceptTNC,
                termsAndCondionsError: "",
              })
            }
            label={"Accept terms and conditions of Kashmir HomeStays"}
          />
        </span>
        {state.termsAndCondionsError ? (
          <div className="errorMessageInput font8">
            {state.termsAndCondionsError}
          </div>
        ) : null}
      </div>
      {props.signupErrorMessage ? (
        <div className="login-server-error font10 secondary-text">
          {props.signupErrorMessage}
        </div>
      ) : null}


<div className="login-terms flex-row font10">
        {/* <span className="flex-row align-center">
          <KuposCheckbox
            checked={state.asOwner}
            onChange={() =>
              setState({
                ...state,
                asOwner: !state.asOwner,
              })
            }
            label={"Register as owner"}
          />
        </span> */}
        {state.termsAndCondionsError ? (
          <div className="errorMessageInput font8">
            {state.termsAndCondionsError}
          </div>
        ) : null}
      </div>
      {props.signupErrorMessage ? (
        <div className="login-server-error font10 secondary-text">
          {props.signupErrorMessage}
        </div>
      ) : null}

      <div className="login-signup-button font12">
        <button disabled={loading} className="general-button" onClick={signup}>
          {loading ? (
            <div className="loader-cricle"></div>
          ) : (
            <span>{"Sign up"}</span>
          )}
        </button>
      </div>
    </div>
  );
};

export default SignUpCard;
