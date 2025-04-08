// import Image from "next/image";
import React, { ReactNode, useEffect, useState } from "react";
import Modal from "react-bootstrap/Modal";
import classes from "./custom-package-modal.module.less";
import classNames from "classnames";
import { useRecoilState, useSetRecoilState } from "recoil";
import {
  customPackageModalState,
  successErrorModalState,
} from "../../recoil/atoms/common";
import MaterialInput from "../material-input/material-input";
import MUIAutoDropDown from "../mui-auto-dropdown/mui-auto-dropdown";
import { callApi } from "../../services/api/callApi";
import { useRouter } from "next/router";
import { Close } from "@mui/icons-material";

interface CustomPackageModalType {
  backdrop?: boolean;
  size?: "sm" | "lg" | "xl" | undefined;
  ariaLabel?: string;
  closeIcon?: boolean;
  onHide: () => void;
  children?: Array<ReactNode> | ReactNode;
  onSubmit?: () => void;
  data: {};
}

interface Car {
  id: number;
  name: string;
}

interface Destination {
  id: number;
  name: string;
}

const CustomPackageModal = (props: CustomPackageModalType) => {
  const router = useRouter();

  // Local state
  const [inputValues, setInputValues] = useState({
    first_name: "",
    last_name: "",
    phone_number: "",
    email: "",
    passengers: "",
    days: "",
    car_id: "",
    location_id: [], // Changed to array
    first_nameError: "",
    last_nameError: "",
    phone_numberError: "",
    emailError: "",
    passengersError: "",
    daysError: "",
    car_idError: "",
    location_idError: "",
  });
  const [cars, setCars] = useState<Car[]>([]);
  const [destinations, setDestinations] = useState<Destination[]>([]);

  // Recoil state
  const [customPackageState, setCustomPackageState] = useRecoilState(
    customPackageModalState
  );
  const setSuccessErrorModalValues = useSetRecoilState(successErrorModalState);

  const onInputChange = (val: string | string[], type: string) => {
    let error = `${type}Error`;

    if (type === "location_id") {
      setInputValues({
        ...inputValues,
        [type]: Array.isArray(val) ? val : [val], // Ensure location_id is an array
        [error]: "",
      });
    } else {
      setInputValues({
        ...inputValues,
        [type]: val,
        [error]: "",
      });
    }
  };

  const validateInputs = () => {
    let errors = 0;

    let inputValuesCopy = { ...inputValues };

    if (!inputValues.first_name) {
      inputValuesCopy.first_nameError = "First name is required";
      errors++;
    }

    if (!inputValues.last_name) {
      inputValuesCopy.last_nameError = "Last name is required";
      errors++;
    }

    if (!inputValues.phone_number) {
      inputValuesCopy.phone_numberError = "Phone number is required";
      errors++;
    }

    if (!inputValues.passengers) {
      inputValuesCopy.passengersError = "Passengers is required";
      errors++;
    }

    if (!inputValues.days) {
      inputValuesCopy.daysError = "Days is required";
      errors++;
    }

    if (!inputValues.car_id) {
      inputValuesCopy.car_idError = "Car is required";
      errors++;
    }

    if (inputValues.location_id.length === 0) {
      inputValuesCopy.location_idError = "Location is required";
      errors++;
    }

    setInputValues(inputValuesCopy);

    return errors === 0;
  };

  const handleSubmit = () => {
    if (!validateInputs()) {
      return;
    }

    let myCarId = +(
      cars.find((it: Car) => it.name === (inputValues?.car_id || ""))?.id || 0
    );

    let myLocationIds = inputValues.location_id.map(
      (locName) => destinations.find((it) => it.name === locName)?.id || 0
    );

    const data = {
      car_id: myCarId,
      firstname: inputValues?.first_name,
      lastname: inputValues?.last_name,
      location_ids: myLocationIds,
      email: inputValues?.email,
      no_of_days: parseInt(inputValues?.days),
      no_of_people: parseInt(inputValues?.passengers),
      phone: inputValues?.phone_number,
    };
    console.log(data, "data in post");

    callApi({
      endPoint: "custom_package",
      method: "POST",
      callback: (result) => {
        console.log(result, "custom_package POST LOG___");

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
            modalBody:
              result.data?.detail ?? "Request Failed. Check Again Later",
          });
        }
      },
      data: data,
    });
  };

  useEffect(() => {
    callApi({
      endPoint: "cars",
      method: "GET",
      callback: (result) => {
        if (result?.status === 200 && result.data?.data) {
          setCars(result.data.data);
        } else {
          console.log("error");
        }
      },
    });
  }, []);

  useEffect(() => {
    callApi({
      endPoint: "destinations",
      method: "GET",
      callback: (result) => {
        if (result?.status === 200 && result.data?.data) {
          setDestinations(result.data.data);
        } else {
          console.log("error");
        }
      },
    });
  }, []);

  const handleCloseClick = () => {
    setCustomPackageState(null);
  };

  return (
    <div className={classes.common_kupos_modal}>
      <Modal
        backdrop={props.backdrop}
        show={customPackageState ?? false}
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
          <div className={classes.main}>
            <div className={classes.close_icon} onClick={handleCloseClick}>
              <Close />
            </div>

            <div className={classNames(classes.SmallNavbar_login)}>
              <div className={classNames(classes.SmallNavbar_login_form)}>
                <div
                  className={classNames(
                    classes.SmallNavbar_login_form_top_section
                  )}
                >
                  <div className={classNames(classes.tittle)}>
                    {" "}
                    Craft Your Unforgettable Journey Enter the Details Below
                  </div>
                </div>
              </div>

              <div className={classNames(classes.input_container)}>
                <MaterialInput
                  label="First name"
                  value={inputValues?.first_name}
                  onChange={(val: string) => onInputChange(val, "first_name")}
                  placeholder="First name"
                  error={inputValues?.first_nameError}
                />
                <MaterialInput
                  label="Last name"
                  value={inputValues?.last_name}
                  onChange={(val: string) => onInputChange(val, "last_name")}
                  placeholder="Last name"
                  error={inputValues?.last_nameError}
                />
                <MaterialInput
                  label="Number of people"
                  value={inputValues?.passengers}
                  onChange={(val: string) => onInputChange(val, "passengers")}
                  placeholder="Passengers"
                  error={inputValues?.passengersError}
                />
                <MaterialInput
                  label="Days of stay"
                  value={inputValues?.days}
                  onChange={(val: string) => onInputChange(val, "days")}
                  placeholder="Days of stay"
                  error={inputValues?.daysError}
                />
              </div>
              <MaterialInput
                label="Phone number"
                value={inputValues?.phone_number}
                onChange={(val: string) => onInputChange(val, "phone_number")}
                placeholder="Enter your Phone number"
                error={inputValues?.phone_numberError}
              />
              <MaterialInput
                label="Email"
                value={inputValues?.email}
                onChange={(val: string) => onInputChange(val, "email")}
                placeholder="Enter your email"
                error={inputValues?.emailError}
              />

              <MUIAutoDropDown
                label="Select Car"
                options={cars}
                onChange={(val) => onInputChange(val, "car_id")}
                value={inputValues["car_id"]}
                placeholder="Select the car"
                error={inputValues?.car_idError}
                multiple={false}
              />
              <MUIAutoDropDown
                label="Select Location"
                options={destinations}
                onChange={(val) => onInputChange(val, "location_id")}
                value={inputValues["location_id"]}
                placeholder="Select the location"
                error={inputValues?.location_idError}
                multiple={true}
              />

              <div
                className={classNames(classes.SmallNavbar_login_form_button)}
              >
                <button onClick={handleSubmit}>Submit your query</button>
              </div>
            </div>
          </div>
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default CustomPackageModal;
