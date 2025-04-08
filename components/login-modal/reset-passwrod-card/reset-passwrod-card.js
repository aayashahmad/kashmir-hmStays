import React, { useState } from "react";
import MyInput from "../../my-input/my-input";

const initialState = {
  resetPassword: "",
  resetPasswordError: "",
  resetConfirmPassword: "",
  resetConfirmPasswordError: "",
};

const ResetPasswordCard = (props) => {
  const t = ()=>{};
  const [state, setState] = useState(initialState);
  const [validateOtpPending, setValidateOtpPending] = useState(
    
  );

  const onResetInputChange = (text, inp) => {
    if (inp == "password") {
      setState({ ...state, resetPasswordError: "", resetPassword: text });
    } else if (inp == "confirmPassword") {
      setState({
        ...state,
        resetConfirmPasswordError: "",
        resetConfirmPassword: text,
      });
    }
  };

  const onResetInputBlur = (text, inp) => {
    if (!text) {
      if (inp == "password") {
        setState({
          ...state,
          resetPasswordError: "VALIDATIONS.VALID_PASSWORD",
        });
      } else if (inp == "confirmPassword") {
        setState({
          ...state,
          resetConfirmPasswordError: "VALIDATIONS.VALID_CONFIRM_PASSWORD",
        });
      }
    } else if (inp == "password") {
      if (state.resetPassword.length < 4) {
        setState({
          ...state,
          resetPasswordError: "VALIDATIONS.VALID_PASSWORD_LENGTH",
        });
      }
    } else if (inp == "confirmPassword") {
      if (state.resetPassword != state.resetConfirmPassword) {
        setState({
          ...state,
          resetConfirmPasswordError: "VALIDATIONS.VALID_CONFIRM_PASSWORD_VALID",
        });
      }
    }
  };

  const onSubmit = () => {
    let errorCount = 0;
    if (!state.resetPassword) {
      setState({ ...state, resetPasswordError: "Ingresa tu contraseña" });
      errorCount++;
    } else if (state.resetPassword.length < 4) {
      setState({
        resetPasswordError: "La contraseña debe contener mínimo 6 dígitos",
      });
      errorCount++;
    }
    if (state.resetPassword != state.resetConfirmPassword) {
      setState({
        resetConfirmPasswordError: "Las contraseñas deben coincidir",
      });
      errorCount++;
    }
    if (errorCount > 0) {
      return;
    }
    // setValidateOtpPending(true);
    props.changePassword(state.resetPassword);
  };

  return (
    <div className="kupos-card log-in-card signup">

      <div className="bold-text center-text font16">
        {"Set New Password"}
      </div>

      <div className="login-signup-inputs">
        <div className="login-signup-input  col-md-12 no-pad font11">
          <MyInput
            className="kupos-border"
            type="password"
            placeholder={"Password"}
            onChange={(text) => onResetInputChange(text, "password")}
            onBlur={(text) => onResetInputBlur(text, "password")}
            value={state.resetPassword}
            error={state.resetPasswordError ? true : false}
            errorMessage={
              state.resetPasswordError ? t(state.resetPasswordError) : ""
            }
          />
        </div>
        <div className="login-signup-input  col-md-12 no-pad font11">
          <MyInput
            className="kupos-border"
            type="password"
            placeholder={"Confirm Password"}
            onChange={(text) => onResetInputChange(text, "confirmPassword")}
            onBlur={(text) => onResetInputBlur(text, "confirmPassword")}
            value={state.resetConfirmPassword}
            error={state.resetConfirmPasswordError ? true : false}
            errorMessage={
              state.resetConfirmPasswordError
                ? t(state.resetConfirmPasswordError)
                : ""
            }
          />
        </div>
      </div>

      <div className="login-signup-button font12">
          <button className="general-button" style={{width: 200}} onClick={onSubmit}>
            <span>Change Password</span>
          </button>
        </div>
    </div>
  );
};

export default ResetPasswordCard;
