import { RecoilRoot } from "recoil";
import Root from "./_root";
import { appWithTranslation } from "next-i18next";
import "../styles/globals.less";

const MyApp = ({ Component, pageProps }) => {
  const openWhatsapp = () => {
    window.open("//api.whatsapp.com/send?phone=917006052604", "_blank");
  };

  return (
    <RecoilRoot>
      <Root>
        <Component {...pageProps} />
      </Root>

      <div
        style={{
          position: "fixed",
          bottom: "24px",
          right: "24px",
          zIndex: 1000,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          cursor: "pointer",
        }}
        onClick={openWhatsapp}
      >
        <img
          src="/images/icons/whatsapp_blue.png"
          style={{ marginRight: "10px" }}
          height={50}
          width={50}
        />
      </div>
    </RecoilRoot>
  );
};

export default appWithTranslation(MyApp);
