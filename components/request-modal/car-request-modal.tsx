import React, { ReactNode, useState } from "react";
import Modal from "react-bootstrap/Modal";
import classes from "./request-modal.module.less";
import classNames from "classnames";
import MaterialInput from "../material-input/material-input";
import { successErrorModalState } from "../../recoil/atoms/common";
import { useSetRecoilState } from "recoil";
import { callApi } from "../../services/api/callApi";

interface KuposModalType {
  backdrop?: boolean;
  showModal: boolean;
  size?: "sm" | "lg" | "xl" | undefined;
  ariaLabel?: string;
  closeIcon?: boolean;
  onHide: () => void;
  children?: Array<ReactNode> | ReactNode;
  onSubmit?: () => void;
  inputValues?: any;
  onChange?: (val: any, name: string) => void;
  data: {};
}

const CarRequestModal = (props: KuposModalType) => {
  //recoil states
  const setSuccessErrorModalValues = useSetRecoilState(successErrorModalState);

  //local states
  const [inputValues, setInputValues] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
    no_of_days: "",
    nameError: "",
    emailError: "",
    phoneError: "",
    messageError: "",
    no_of_daysError: "",
  });

  const validateInputs = () => {
    let errors = 0;
    let inputValuesCopy = { ...inputValues };

    if (!inputValues.name) {
      inputValuesCopy.nameError = "Name is required";
      errors++;
    }

    if (!inputValues.phone) {
      inputValuesCopy.phoneError = "Phone number is required";
      errors++;
    }
    if (!inputValues.email) {
      inputValuesCopy.emailError = "Email is required";
      errors++;
    }
    if (!inputValues.no_of_days) {
      inputValuesCopy.no_of_daysError = "No of days is required";
      errors++;
    }

    setInputValues(inputValuesCopy);

    return errors === 0;
  };

  const handleSubmit = () => {
    if (!validateInputs()) {
      return;
    }

    let data = {
      car_id: (props?.data as { id: string })?.id,
      email: inputValues?.email,
      message: inputValues?.message,
      name: inputValues?.name,
      phone: inputValues?.phone,
      no_of_days: inputValues?.no_of_days,
    };

    callApi({
      endPoint: "booking/car",
      method: "POST",
      callback: (result) => {
        props.onHide();
        if (
          result?.data &&
          result?.data?.app_code === 100 &&
          result?.data?.message === "Car booking request saved successfully"
        ) {
          setSuccessErrorModalValues({
            showModal: true,
            success: true,
            modalTitle: "Your request has been submitted!",
          });
        } else {
          setSuccessErrorModalValues({
            showModal: true,
            success: false,
            modalTitle:
              "There is some issue in submitting your request, Please try again!",
          });
          console.log("error");
        }
      },
      data: data,
    });
  };

  const onInputChange = (val: string, type: string) => {
    let error = `${type}Error`;

    setInputValues({
      ...inputValues,
      [type]: val,
      [error]: "",
    });
  };

  return (
    <div className={classes.common_kupos_modal}>
      <Modal
        backdrop={props.backdrop}
        show={props.showModal}
        onHide={props.onHide}
        size={props.size}
        aria-labelledby={props.ariaLabel}
        centered
      >
        <Modal.Body>
          <Modal.Header closeButton>
            {props.closeIcon && (
              <div className={classes.close_icon} onClick={props.onHide}>
                <img
                  src={"/images/icons/close.png"}
                  height={20}
                  width={"auto"}
                  alt="close icon"
                />
              </div>
            )}
          </Modal.Header>
          {
            <div className={classes.main}>
              <div className={classNames(classes.SmallNavbar_login)}>
                <div className={classNames(classes.SmallNavbar_login_form)}>
                  <div className={classNames(classes.input_container)}>
                    <MaterialInput
                      label="Name"
                      value={inputValues?.name}
                      onChange={(val: string) => onInputChange(val, "name")}
                      placeholder="Name"
                      error={inputValues?.nameError}
                    />
                    <MaterialInput
                      label="Email"
                      value={inputValues?.email}
                      onChange={(val: string) => onInputChange(val, "email")}
                      placeholder="Enter your Email"
                      error={inputValues?.emailError}
                    />
                  </div>
                  <div className={classNames(classes.input_container)}>
                    <MaterialInput
                      label="Phone number"
                      value={inputValues?.phone}
                      onChange={(val: string) => onInputChange(val, "phone")}
                      placeholder="Enter your Phone number"
                      error={inputValues?.phoneError}
                    />
                    <MaterialInput
                      label="Days"
                      value={inputValues?.no_of_days}
                      onChange={(val: string) =>
                        onInputChange(val, "no_of_days")
                      }
                      placeholder="Enter no of days"
                      error={inputValues?.no_of_daysError}
                    />
                  </div>
                  <MaterialInput
                    label="Message"
                    value={inputValues?.message}
                    onChange={(val: string) => onInputChange(val, "message")}
                    placeholder="Enter your message"
                    error={inputValues?.messageError}
                    multiline={true}
                    rows={2}
                  />

                  <div
                    className={classNames(
                      classes.SmallNavbar_login_form_button
                    )}
                  >
                    <button onClick={handleSubmit}>Submit your query</button>
                  </div>
                </div>
              </div>
            </div>
          }
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default CarRequestModal;
