import React, { ReactElement, ReactNode } from "react";
import KuposModal from "../kupos-modal/kupos-modal";
import classes from "./index.module.less";

interface KuposModalWithButtonsType {
  showModal: boolean;
  onHide: () => void;
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
  titleStyle: Object;
  subTitleStyle: Object;
  children?: Array<ReactNode>;
}

const KuposModalWithButtons = (props: KuposModalWithButtonsType) => {
  return (
    <div className={classes.kupos_modal_with_buttons}>
      <KuposModal
        size={props.size}
        showModal={props.showModal}
        onHide={props.onHide}
        ariaLabel={props.ariaLabel}
      >
        {!props.showLoader ? (
          !props.hideAllContent ? (
            <div
              className={
                classes.kupos_modal_with_buttons + " modal-type-" + props.type
              }
            >
              {props.modalIcon ? (
                <div className="kupos-modal-icon">
                  <img src={props.modalIcon} alt="" />
                </div>
              ) : null}
              {props.modalTitle ? (
                <div
                  className={
                    classes.kupos_modal_title2 +
                    " bold-text " +
                    (props.type == "alert" ? " font12" : " font12")
                  }
                  style={props.titleStyle}
                >
                  {props.modalTitle}
                </div>
              ) : null}
              {props.modalSubTitle ? (
                <div
                  className="kupos-modal-subTitle font12"
                  style={props.subTitleStyle ? props.subTitleStyle : {}}
                >
                  {props.modalSubTitle}
                </div>
              ) : null}
              {props.modalBody ? (
                <div className={classes.kupos_modal_bodyTex + " font10"}>
                  {props.modalBody}
                </div>
              ) : null}
              {props.noTitleGap ? null : (
                <div className="kupos-modal-gap"></div>
              )}
              {props.children}
              <div className="kupos-modal-gap"></div>
              {props.showButton1 ? (
                <div className="kupos-modal-button-div font12">
                  <button
                    style={{
                      width: props.buttonWidth ? props.buttonWidth : "100%",
                    }}
                    className="kupos-button"
                    onClick={() =>
                      props.onButtonClick1
                        ? props.onButtonClick1()
                        : props.onHide()
                    }
                    disabled={props.button1Loading}
                  >
                    {props.button1Loading ? (
                      <div className="loader-cricle"></div>
                    ) : props.buttonText1 ? (
                      props.buttonText1
                    ) : (
                      "OK"
                    )}
                  </button>
                </div>
              ) : null}
              {props.showButton2 ? (
                <div className="kupos-modal-button-div font12">
                  <button
                    style={{
                      width: props.buttonWidth ? props.buttonWidth : "100%",
                    }}
                    className="kupos-button2"
                    onClick={(e) =>
                      props.onButtonClick2 ? props.onButtonClick2() : null
                    }
                    disabled={props.button2Loading}
                  >
                    {props.button2Loading ? (
                      <div className="loader-cricle"></div>
                    ) : (
                      props.buttonText2
                    )}
                  </button>
                </div>
              ) : null}

              {props.hideIcon ? (
                <div
                  className="kupos-modal-cross-icon"
                  onClick={() => props.onHide()}
                >
                  <img src={props.hideIcon} alt="" />
                </div>
              ) : null}
            </div>
          ) : (
            props.children
          )
        ) : (
          <div className="modal-loader">
            <div className="loader-cricle"></div>
          </div>
        )}
      </KuposModal>
    </div>
  );
};

export default KuposModalWithButtons;
