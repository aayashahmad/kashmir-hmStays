import React, { ReactNode } from "react";
import Modal from "react-bootstrap/Modal";
import classes from "./kupos-modal.module.less";

interface KuposModalType {
  backdrop?: boolean;
  showModal: boolean;
  size?: "sm" | "lg" | "xl" | undefined;
  ariaLabel?: string;
  closeIcon?: boolean;
  onHide: () => void;
  children?: Array<ReactNode> | ReactNode;
}

const KuposModal = (props: KuposModalType) => {
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
              {props.children}
            </div>
          }
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default KuposModal;
