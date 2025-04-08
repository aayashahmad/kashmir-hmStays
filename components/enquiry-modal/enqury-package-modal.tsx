import React, { ReactNode, useState } from "react";
import Modal from "react-bootstrap/Modal";
import classes from "./custom-package-modal.module.less";
import { useSetRecoilState } from "recoil";
import { successErrorModalState } from "../../recoil/atoms/common";
import MaterialInput from "../material-input/material-input";
import { callApi } from "../../services/api/callApi";
import { useRouter } from "next/router";
import ImageWithFallback from "../image-with-fallback";
import WhatsAppIcon from "@mui/icons-material/WhatsApp";
import LocalPhoneIcon from "@mui/icons-material/LocalPhone";
import { Button } from "react-bootstrap";
import { Close } from "@mui/icons-material";

interface EnquryPackageModalType {
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

const EnquryPackageModal = (props: EnquryPackageModalType) => {
  const router = useRouter();

  //local state
  const [inputValues, setInputValues] = useState({
    first_name: "",
    last_name: "",
    phone_number: "",
    email: "",
    passengers: "",
    days: "",
  });

  const setSuccessErrorModalValues = useSetRecoilState(successErrorModalState);

  const onInputChange = (val: string, type: string) => {
    setInputValues({ ...inputValues, [type]: val });
  };

  const validateInputs = () => {
    let errors = 0;
    let inputValuesCopy = { ...inputValues };

    // Helper function to validate email format
    const validateEmail = (email: string) => {
      const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      return emailPattern.test(email);
    };

    // Helper function to check if a value is numeric
    const isNumeric = (value: string) => {
      return /^\d+$/.test(value);
    };

    // Validate first name
    if (!inputValues.first_name) {
      inputValuesCopy.first_nameError = "First name is required";
      errors++;
    } else {
      delete inputValuesCopy.first_nameError;
    }

    // Validate last name
    if (!inputValues.last_name) {
      inputValuesCopy.last_nameError = "Last name is required";
      errors++;
    } else {
      delete inputValuesCopy.last_nameError;
    }

    // Validate phone number
    if (!inputValues.phone_number) {
      inputValuesCopy.phone_numberError = "Phone number is required";
      errors++;
    } else if (!isNumeric(inputValues.phone_number)) {
      inputValuesCopy.phone_numberError = "Phone number must be numeric";
      errors++;
    } else {
      delete inputValuesCopy.phone_numberError;
    }

    // Validate email
    if (!inputValues.email) {
      inputValuesCopy.emailError = "Email is required";
      errors++;
    } else if (!validateEmail(inputValues.email)) {
      inputValuesCopy.emailError = "Email is not valid";
      errors++;
    } else {
      delete inputValuesCopy.emailError;
    }

    // Validate number of passengers
    if (!inputValues.passengers) {
      inputValuesCopy.passengersError = "Number of passengers is required";
      errors++;
    } else if (!isNumeric(inputValues.passengers)) {
      inputValuesCopy.passengersError = "Number of passengers must be numeric";
      errors++;
    } else {
      delete inputValuesCopy.passengersError;
    }

    // Validate number of days
    if (!inputValues.days) {
      inputValuesCopy.daysError = "Number of days is required";
      errors++;
    } else if (!isNumeric(inputValues.days)) {
      inputValuesCopy.daysError = "Number of days must be numeric";
      errors++;
    } else {
      delete inputValuesCopy.daysError;
    }

    setInputValues(inputValuesCopy);

    return errors === 0;
  };

  const handleSubmit = () => {
    if (!validateInputs()) {
      return;
    }

    let myLocationId = +(
      destinations.find((it) => it.name === (inputValues?.location_id || ""))
        ?.id || 0
    );

    const data = {
      firstname: inputValues?.first_name,
      lastname: inputValues?.last_name,
      location_id: myLocationId,
      email: inputValues?.email,
      no_of_days: parseInt(inputValues?.days),
      no_of_people: parseInt(inputValues?.passengers),
      phone: inputValues?.phone_number,
    };
    callApi({
      endPoint: "custom_package",
      method: "POST",
      callback: (result) => {
        if (result?.status === 201 && result.data) {
          setSuccessErrorModalValues({
            showModal: true,
            success: true,
            modalTitle: "Success",
            modalBody: "Request Submitted Successfully",
            onButtonClick: () => {
              setSuccessErrorModalValues({});
              router.push("/");
            },
          });
        } else {
          setSuccessErrorModalValues({
            showModal: true,
            success: false,
            modalTitle: "Failure",
            modalBody: result.data?.detail ?? "Request Faild Check Again Later",
          });
        }
      },
      data: data,
    });

    // useEffect(() => {
    //   callApi({
    //     endPoint: "hotels",
    //     method: "GET",
    //     callback: (result) => {
    //       if (result?.status === 200 && result.data?.data) {
    //         setHotels(result.data.data);
    //       } else {
    //         console.log("error");
    //       }
    //     },
    //   });
    // }, []);

    // useEffect(() => {
    //   callApi({
    //     endPoint: "cars",
    //     method: "GET",
    //     callback: (result) => {
    //       if (result?.status === 200 && result.data?.data) {
    //         setCars(result.data.data);
    //       } else {
    //         console.log("error");
    //       }
    //     },
    //   });
    // }, []);

    // useEffect(() => {
    //   callApi({
    //     endPoint: "destinations",
    //     method: "GET",
    //     callback: (result) => {
    //       if (result?.status === 200 && result.data?.data) {
    //         setDestinations(result.data.data);
    //       } else {
    //         console.log("error");
    //       }
    //     },
    //   });
    // }, []);
  };

  const handleCloseClick = () => {
    props.onHide();
  };

  return (
    <Modal
      backdrop={props.backdrop}
      show={props.showModal}
      onHide={props.onHide}
      size={props.size}
      aria-labelledby={"enquiry_modal"}
      centered
    >
      <Modal.Body className={classes.modalBody}>
        <div className={classes.modalContent}>
          <div className={classes.modalLeft}>
            <ImageWithFallback
              src="/images/about-images/logo76-removebg-preview.png"
              alt="Logo"
              width={150}
              height={150}
              // style={{ borderRadius: "50%" }}
            />
            <p>Discover Kashmir With Us</p>
            <div className={classes.contactIcons}>
              <a
                href="https://wa.me/your-number"
                target="_blank"
                rel="noopener noreferrer"
              >
                <WhatsAppIcon />
              </a>
              <a href="tel:your-phone-number">
                <LocalPhoneIcon />
              </a>
            </div>
          </div>
          <div className={classes.modalRight}>
            <div className={classes.modal_title}>
              Inquire Now For The Best Deals
            </div>
            <div className={classes.inputGroup}>
              <MaterialInput
                label="Enter your name"
                value={inputValues.first_name}
                onChange={(val) => onInputChange(val, "first_name")}
                error={inputValues.first_nameError}
              />
              <MaterialInput
                label="Enter your email address"
                value={inputValues.email}
                onChange={(val) => onInputChange(val, "email")}
                error={inputValues.emailError}
              />
              <MaterialInput
                label="Enter your phone number"
                value={inputValues.phone_number}
                onChange={(val) => onInputChange(val, "phone_number")}
                error={inputValues.phone_numberError}
              />
              <MaterialInput
                label="Enter number of days"
                value={inputValues.days}
                onChange={(val) => onInputChange(val, "days")}
                error={inputValues.daysError}
              />
              <MaterialInput
                label="Enter number of travelers"
                value={inputValues.passengers}
                onChange={(val) => onInputChange(val, "passengers")}
                error={inputValues.passengersError}
              />
              <Button className={classes.submitButton} onClick={handleSubmit}>
                Submit
              </Button>
            </div>
          </div>
          <div className={classes.closeIcon} onClick={handleCloseClick}>
            {/* <FontAwesomeIcon icon={faXmark} /> */}
            <Close />
          </div>
        </div>
      </Modal.Body>
    </Modal>
  );
};

export default EnquryPackageModal;
