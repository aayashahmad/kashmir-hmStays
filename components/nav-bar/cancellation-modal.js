import React, { useState } from "react";
import KuposModal from "../ui/kupos-modal/kupos-modal";
import SvgHome from "../ui/svg-home/svg-home";
import { TicketDetails } from "../../services/apis/apisPB";
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import {
  cancellationModalState,
  metaDataState,
} from "../../recoil/atoms/common";
import { TicketDetailsAT } from "../../services/apis/apisAT";
import { useRouter } from "next/router";
import { busTicketDetailsState } from "../../recoil/atoms/pasajebus";
import { atTicketDetailsState } from "../../recoil/atoms/airport";
import CancellationInputs from "../common/cancellation-inputs";

const initialState = {
  selectedTab: 1,
  cancelPrintTicketPNR: "",
  cancelPrintTicketPNRError: "",
  cancelPrintTicketDate: "",
  cancelPrintTicketDateError: "",
  cancelPrintTicketEmail: "",
  cancelPrintTicketEmailError: "",
  cancelPrintTicketCheck: false,
  showSuccessModal: false,
  modalSuccess: false,
  modalBodyText: "",
  showReserveNumberModal: false,
  findPnrSelected: false,
  showTNCModal: false,
  loader: false,
  capsuleMenuAcktiveTab: 1,
};

const modalInitialState = {
  showSuccessModal: false,
  modalSuccess: false,
  modalBodyText: "",
};

const CancellationModal = ({ t, showModal, onHide }) => {
  const router = useRouter();
  // Apis functions
  const getTicketDetailsFunc = TicketDetails();
  const getAtTicketDetailsFunc = TicketDetailsAT();
  // Recoil States
  const metaData = useRecoilValue(metaDataState);
  const setBusTicketDetails = useSetRecoilState(busTicketDetailsState);
  const setATTicketDetails = useSetRecoilState(atTicketDetailsState);
  const [openCancellationModal, setOpenCancellationModal] = useRecoilState(
    cancellationModalState
  );
  // Local states
  const [state, setState] = useState(initialState);

  // functions


  const onHideLocal = () => {
    onHide();
    setState(initialState);
  };

  return (
    <div className="common-login-modal">
      <KuposModal
        showModal={showModal}
        onHide={onHideLocal}
        size="md"
        ariaLabel="login-modal"
      >
        <div className="login-signup-block">
          <div className="close-button pointer" onClick={onHideLocal}>
            <SvgHome name="close" />
          </div>

          <div className={"kupos-card print-cancel-section-modal cancel-modal"}>
            <div className="bold-text font16 flex-center print-section-cancel-modal-title">
              {t("CANCEL_TICKET.CANCEL_TICKET")}
            </div>
            <CancellationInputs t={t} type="both" onHide={onHide} />
          </div>
        </div>
      </KuposModal>

    </div>
  );
};

export default CancellationModal;
