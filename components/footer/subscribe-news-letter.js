import { useState } from "react";
import { useSetRecoilState } from "recoil";
import { kuposModalErrorSuccessState } from "../../../recoil/atoms/common";
import { SubscribeNewsLetter } from "../../../services/apis/apisPB";
import CommonService from "../../../services/commonService";

const initialState = {
  email: null,
  subscribePending: false,
};

const KuposSubscribeNewsLetter = ({ t }) => {
  const [state, setState] = useState(initialState);
  const subscribeNewsLetter = SubscribeNewsLetter();
  const setKuposModalErrorSuccessState = useSetRecoilState(
    kuposModalErrorSuccessState
  );

  const subscribe = () => {
    if (!state.email) {
      setState({
        ...state,
        emailError: "VALIDATIONS.VALID_EMAIL",
      });
      return;
    } else if (!CommonService.isEMailValid(state.email)) {
      setState({
        ...state,
        emailError: "VALIDATIONS.VALID_EMAIL_VALIDATION",
      });
      return;
    }
    setState({ ...state, subscribePending: true });
    subscribeNewsLetter({
      callback: (res) => {
        try {
          if (res && res.status == 200) {
            setKuposModalErrorSuccessState({
              showModal: true,
              success: true,
              modalTitle:t("HOME.THANK_YOU"),
              modalSubTitle: t("HOME.NEWSLETTER_1"),
              modalBody: t("HOME.NEWSLETTER_2"),
            });
          } else {
            setKuposModalErrorSuccessState({
              showModal: true,
              success: false,
              modalBody: res.error,
            });
          }
        } catch (error) {
        } finally {
          setState({ ...state, subscribePending: false });
        }
      },
      data: { email: state.email },
    });
  };
  return (
    <div className="subscribe-div">
      <span className="bold-footer-item bold-text font14">
        {t("HOME.NEWSLETTER")}
      </span>
      <div className="footer-news-letter-input flex-row font10">
        <input
          className="font10"
          type="email"
          placeholder={t("PASSENGER_DETAILS.EMAIL_ID")}
          value={state?.email || ""}
          onChange={(event) =>
            setState({
              ...state,
              email: event.target.value.trim(),
              emailError: null,
            })
          }
          onBlur={(event) => setState({ ...state, email: event.target.value })}
        />
        <button
          onClick={subscribe}
          className="kupos-button no-decoration"
          disabled={state.subscribePending ? true : false}
        >
          {state.subscribePending ? (
            <div className="loader-cricle"></div>
          ) : (
            <span>{t("HOME.SEND")}</span>
          )}
        </button>
      </div>
      {state.emailError ? (
        <div style={{ marginTop: -5 }} className="errorMessageInput font8">
          {t(state.emailError)}
        </div>
      ) : null}
    </div>
  );
};

export default KuposSubscribeNewsLetter;
