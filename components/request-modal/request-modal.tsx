import React, { ReactNode, useState } from "react";
import Modal from "react-bootstrap/Modal";
import classes from "./request-modal.module.less";
import classNames from "classnames";
import MaterialInput from "../material-input/material-input";
import { successErrorModalState } from "../../recoil/atoms/common";
import { useSetRecoilState } from "recoil";
import { callApi } from "../../services/api/callApi";
import ImageWithFallback from "../image-with-fallback";

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

const RequestModal = (props: KuposModalType) => {
  //recoil states

  const setSuccessErrorModalValues = useSetRecoilState(successErrorModalState);

  //local states
  const [inputValues, setInputValues] = useState({
    first_name: "",
    last_name: "",
    email: "",
    phone: "",
    passengers: "",
    message: "",
    first_nameError: "",
    last_nameError: "",
    emailError: "",
    phoneError: "",
    passengersError: "",
    messageError: "",
    days: "",
    daysError: "",
  });

  const validateInputs = () => {
    let erros = 0;

    let inputValuesCopy = { ...inputValues };

    if (!inputValues.first_name) {
      inputValuesCopy.first_nameError = "First name is required";
      erros++;
    }

    if (!inputValues.last_name) {
      inputValuesCopy.last_nameError = "Last name is required";
      erros++;
    }

    if (!inputValues.phone) {
      inputValuesCopy.phoneError = "Phone number is required";
      erros++;
    }
    if (!inputValues.email) {
      inputValuesCopy.emailError = "email is required";
      erros++;
    }

    if (!inputValues.passengers) {
      inputValuesCopy.passengersError = "traveler count is required";
      erros++;
    }

    setInputValues(inputValuesCopy);

    return erros === 0;
  };

  const handleSubmit = () => {
    if (!validateInputs()) {
      return;
    }

    let selectedPack = props.data;

    let data = {
      activity_id: 0,
      car_id: 0,
      destination_id: 0,
      hotel_id: props?.data?.id,
      email: inputValues?.email,
      message: inputValues?.message,
      name: inputValues?.first_name + " " + inputValues?.last_name,
      package_id: selectedPack?.id,
      passengers: inputValues?.passengers,
      phone: inputValues?.phone,
      date: inputValues?.date,
    };

    callApi({
      endPoint: "booking",
      method: "POST",
      callback: (result) => {
        props.onHide();
        if (
          result?.data &&
          result?.data?.app_code === 100 &&
          result?.data?.message === "Booking request saved successfully"
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

  // const onInputChange = (val: string, type: string) => {
  //   let error = `${type}Error`;

  //   setInputValues({
  //     ...inputValues,
  //     [type]: val,
  //     [error]: "",
  //   });
  // };
  const onInputChange = (val: string, type: string) => {
    let error = `${type}Error`;

    if (type === "phone") {
      // Check if the phone number is exactly 10 digits long
      if (val.length !== 10) {
        // Set the error message when the phone number is not 10 digits
        setInputValues({
          ...inputValues,
          [type]: val, // Set the phone number value
          [error]: "Phone number must be exactly 10 digits long", // Set the error message
        });
      } else {
        // Clear the error if the phone number is valid
        setInputValues({
          ...inputValues,
          [type]: val, // Set the phone number value
          [error]: "", // Clear the error message
        });
      }
    } else {
      // For other input types
      setInputValues({
        ...inputValues,
        [type]: val,
        [error]: "", // Clear error for other fields
      });
    }
  };

  console.log("LOG___ props?.data", props?.data);

  return (
    <div className={classes.common_kupos_modal}>
      <Modal
        backdrop={props.backdrop}
        show={props.showModal}
        onHide={props.onHide}
        size={props.size}
        aria-labelledby={
          props.ariaLabel === "tncmodal"
            ? "tncmodal"
            : props.ariaLabel === "logout"
            ? "logout"
            : "contained-modal-title-vcenter " + props.ariaLabel
        }
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
              {props.closeIcon ? (
                <div className={classes.close_icon} onClick={props.onHide}>
                  <img
                    src={"/images/icons/close.png"}
                    height={20}
                    width={"auto"}
                    alt="close icon"
                  />{" "}
                </div>
              ) : null}

              <div className={classNames(classes.SmallNavbar_login)}>
                {props?.data && (
                  <div
                    className={classNames(classes.SmallNavbar_login_head_image)}
                  >
                    <div className={classNames(classes.SmallNavbar_login_img)}>
                      {/* <Image src={props?.data?.image?.url} alt="loding..."  /> */}

                      <ImageWithFallback
                        src={props?.data?.image?.url}
                        alt={"loding"}
                        style={""}
                        width={350}
                        height={350}
                      />
                    </div>
                    <div className={classNames(classes.SmallNavbar_login_text)}>
                      <span>{props?.data?.name}</span>
                      {/* <div>Starts from: Rs {props?.data?.per_room_rate}</div> */}
                    </div>
                  </div>
                )}
                <div className={classNames(classes.SmallNavbar_login_form)}>
                  <div className={classNames(classes.SmallNavbar_login_form)}>
                    <div className={classNames(classes.input_container)}>
                      <MaterialInput
                        label="First name"
                        value={inputValues?.first_name}
                        onChange={(val: string) =>
                          onInputChange(val, "first_name")
                        }
                        placeholder="First name"
                        error={inputValues?.first_nameError}
                      />
                      <MaterialInput
                        label="Last name"
                        value={inputValues?.last_name}
                        onChange={(val: string) =>
                          onInputChange(val, "last_name")
                        }
                        placeholder="Last name"
                        error={inputValues?.last_nameError}
                      />
                      <MaterialInput
                        label="traveler count"
                        value={inputValues?.passengers}
                        onChange={(val: string) =>
                          onInputChange(val, "passengers")
                        }
                        placeholder="Passengers"
                        error={inputValues?.passengersError}
                      />
                      <MaterialInput
                        label="Days"
                        value={inputValues?.days}
                        onChange={(val: string) => onInputChange(val, "days")}
                        placeholder="Days"
                        error={inputValues?.daysError}
                      />
                    </div>

                    <MaterialInput
                      type={"date"}
                      // label="date"
                      value={inputValues?.date}
                      onChange={(val: string) => onInputChange(val, "date")}
                    />
                    <MaterialInput
                      label="Email"
                      value={inputValues?.email}
                      onChange={(val: string) => onInputChange(val, "email")}
                      placeholder="Enter your Email"
                      error={inputValues?.emailError}
                      type="email"
                    />
                    <MaterialInput
                      label="Phone number"
                      value={inputValues?.phone}
                      onChange={(val: string) => onInputChange(val, "phone")}
                      placeholder="enter your Phone number"
                      error={inputValues?.phoneError}
                      type="number"
                    />
                    <MaterialInput
                      label="Message"
                      value={inputValues?.message}
                      onChange={(val: string) => onInputChange(val, "message")}
                      placeholder="enter your message"
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
            </div>
          }
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default RequestModal;
