import React, { ReactElement } from "react";
import KuposModal from "../kupos-modal/kupos-modal";


interface SuccessErrorModalType {
  showModal: boolean;
  success: boolean;
  onHide: () => void;
  onButtonClick: Function;
  onButtonClick1: Function;
  onButtonClick2: Function;
  showButton1: boolean;
  showButton2: boolean;
  buttonText1: string;
  buttonText2: string;
  button1Loading: boolean;
  button2Loading: boolean;
  modalTitle: string;
  modalSubTitle: string;
  modalBody: string;
  modalIcon: string;
  hideAllContent: boolean;
  type: string;
  size: "sm" | "lg" | "xl" | undefined;
  buttonWidth: string;
  showLoader: boolean;
  hideIcon: string;
  noTitleGap: boolean;
  titleStyle: Object
  subTitleStyle: Object;
  backdrop: boolean;
  showMyTitle: boolean;
  generalButton: string;
  children: ReactElement;
  t: Function;
}


const SuccessErrorModal = (props: SuccessErrorModalType) => {

  return (
    <div className="common_sign_up_success_modal">
      <KuposModal
        showModal={props.showModal}
        onHide={props.onHide || props.onButtonClick}
        size={props.size}
      >
        <div className="kupos-modal-icon" style={{ paddingTop: 26 }}>
          <img
            src={
              props.success
                ? "/images/icons/circular-icons/icon-success.png"
                : "/images/icons/circular-icons/icon-failure.png"
            }
            alt=""
          />
        </div>

        <div className="kupos-modal-title font13">
          <span className="bold-text">
            {props.showMyTitle
              ? props.t && props.t(props.modalTitle)
              : props.modalTitle ||
              (props.success
                ? props.t
                  ? props.t("HOME.THANK_YOU")
                  : "Great!"
                : props.t
                  ? props.t("HOME.WE_ARE_SORRY")
                  : "Sorry!")}
          </span>
        </div>

        <div className="kupos-modal-subtitle font11">
          <span>
            {props.t
              ? props.t(props.modalSubTitle)
              : props.modalSubTitle}
          </span>
        </div>

        <div className="kupos-modal-bodytext font11">
          {props.modalBody
            ? props.modalBody?.split("\n").map((val, i) => {
              return (
                <span key={i}>
                  {props.t ? props.t(val) : val}
                  <br />
                </span>
              );
            })
            : null}
        </div>

        {props.children}

        <div style={{ paddingBottom: 26 }}>

          {!props.showButton1 ? (
            <div className="kupos-modal-button font12">
              <div
                className="kupos-button"
                onClick={
                  () => props.onButtonClick
                    ? props.onButtonClick()
                    : props.onHide()
                }
              >
                {props.success
                  ? props.generalButton
                    ? props.generalButton
                    : "OK"
                  : props.generalButton
                    ? props.generalButton
                    : props.t
                      ? props.t("PROFILE.GO_BACK")
                      : "Okay"}
              </div>
            </div>
          ) : null}

          {props.showButton1 ? (
            <div className="kupos-modal-button-div font12">
              <div
                className="kupos-button"
                onClick={
                  () =>
                    props.onButtonClick1
                      ? props.onButtonClick1()
                      : props.onHide()
                }
              >
                {props.buttonText1
                  ? props.buttonText1
                  : props.t
                    ? props.t("HOME.OK_CONTINUE")
                    : "OK"}
              </div>
            </div>
          ) : null}

          {props.showButton2 ? (
            <div className="kupos-modal-button-div font12">
              <div
                className="kupos-button2"
                onClick={() => props.onButtonClick2 ? props.onButtonClick2() : null}
              >
                {props.buttonText2}
              </div>
            </div>
          ) : null}

        </div>


      </KuposModal>
    </div>
  );
}

export default SuccessErrorModal;
