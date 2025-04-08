import { useRecoilState } from "recoil";
import KuposModalWithButtons from "../components/kupos-modal-with-buttons";
import { kuposModalWithButtonsState, metaDataState, successErrorModalState } from "../recoil/atoms/common";
import SuccessErrorModal from "../components/success-error-modal/success-error-modal";
import LoginModal from "../components/login-modal/login-modal";
import CustomPackageModal from "../components/custom-package-modal/custom-package-modal";
import { useEffect } from "react";
import { callApi } from "../services/api/callApi";


const Root = (props) => {

  const [metaData, setMetaData] = useRecoilState(metaDataState);

  const [
    kuposModalWithButtonsValue,
    setKuposModalWithButtonsState,
  ] = useRecoilState(kuposModalWithButtonsState);


  const [successErrorModalValues, setSuccessErrorModalValues] = useRecoilState(successErrorModalState)

  const closeModal = () => {
    setKuposModalWithButtonsState({});
  };


  const closeErrorSuccessModal = () => {
    setSuccessErrorModalValues({})
  }

  useEffect(() => {
    callApi({
      endPoint: "metadata",
      method: "GET",
      callback: (result) => {

        if (result?.status === 200 && result?.data) {
          setMetaData(result?.data);

        } else {
          console.log("error");
        }
      },
    });

  }, []);

  return (

    <>

      {props.children}
      <KuposModalWithButtons
        size={kuposModalWithButtonsValue.size}
        showModal={kuposModalWithButtonsValue.showModal}
        modalTitle={kuposModalWithButtonsValue.modalTitle}
        modalSubTitle={kuposModalWithButtonsValue.modalSubTitle}
        modalBody={kuposModalWithButtonsValue.modalBody}
        type={kuposModalWithButtonsValue.type || "alert"}
        showButton1={kuposModalWithButtonsValue.showButton1 ?? true}
        buttonText1={kuposModalWithButtonsValue.buttonText1 ?? "OK"}
        button1Loading={kuposModalWithButtonsValue.button1Loading}
        onButtonClick1={
          kuposModalWithButtonsValue.onButtonClick1
            ? kuposModalWithButtonsValue.onButtonClick1
            : closeModal
        }
        showButton2={kuposModalWithButtonsValue.showButton2}
        buttonText2={kuposModalWithButtonsValue.buttonText2}
        button2Loading={kuposModalWithButtonsValue.button2Loading}
        onButtonClick2={
          kuposModalWithButtonsValue.onButtonClick2
            ? kuposModalWithButtonsValue.onButtonClick2
            : closeModal
        }
        modalIcon={kuposModalWithButtonsValue.modalIcon}
        buttonTextStyle={{ fontSize: 15 }}
        showCloseIcon={
          kuposModalWithButtonsValue.showCloseIcon
            ? kuposModalWithButtonsValue.showCloseIcon
            : closeModal
        }
        hideIcon={kuposModalWithButtonsValue.hideIcon}
        onHide={
          kuposModalWithButtonsValue.onHide
            ? kuposModalWithButtonsValue.onHide
            : closeModal
        }
        backdrop={kuposModalWithButtonsValue.backdrop ?? true}
        ariaLabel={kuposModalWithButtonsValue.ariaLabel}
      >
        {kuposModalWithButtonsValue.children
          ? kuposModalWithButtonsValue.children()
          : []}
      </KuposModalWithButtons>

      <SuccessErrorModal
        size={successErrorModalValues.size || "md"}
        showModal={successErrorModalValues.showModal}
        success={successErrorModalValues.success}
        modalTitle={successErrorModalValues.modalTitle}
        modalSubTitle={successErrorModalValues.modalSubTitle}
        modalBody={successErrorModalValues.modalBody}
        onButtonClick={
          successErrorModalValues.onButtonClick
            ? successErrorModalValues.onButtonClick
            : closeErrorSuccessModal
        }
        showButton1={successErrorModalValues.showButton1}
        buttonText1={successErrorModalValues.buttonText1}
        onButtonClick1={
          successErrorModalValues.onButtonClick1
            ? successErrorModalValues.onButtonClick1
            : closeErrorSuccessModal
        }
        showButton2={successErrorModalValues.showButton2}
        buttonText2={successErrorModalValues.buttonText2}
        onButtonClick2={
          successErrorModalValues.onButtonClick2
            ? successErrorModalValues.onButtonClick2
            : closeErrorSuccessModal
        }
        onHide={
          successErrorModalValues.onHide
            ? successErrorModalValues.onHide
            : closeErrorSuccessModal
        }
        backdrop={successErrorModalValues.backdrop ?? true}
        showMyTitle={successErrorModalValues.showMyTitle}
        generalButton={successErrorModalValues.generalButton}
      />

      <LoginModal />

      <CustomPackageModal />

    </>
  );
}

export default Root;
