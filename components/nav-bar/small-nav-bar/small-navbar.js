import classNames from "classnames";
import classes from "./small-navbar.module.less";
import Image from "next/image";
import { useRouter } from "next/router";
import ContentContainer from "../../content-container/content-container";
import { loginDataState, showLoginModalState } from "../../../recoil/atoms/common";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { Avatar } from "@mui/material";

const SmallNavbarComponent = ({ }) => {
  const router = useRouter();

  // recoil states
  const setShowLoginModal = useSetRecoilState(showLoginModalState);
  const loginData = useRecoilValue(loginDataState);

  const goToAccount = () => {
    router.push('/my-account')
  }

  return (
    <div className={classNames(classes.small_navbar_parent)}>
      <ContentContainer>

        <div className={classNames(classes.small_navbar_logo_text_container)}>
          <Image src={"/images/about-images/logo76-removebg-preview.png"} width={180} height={60} onClick={() => router.push('/')} style={{ cursor: "pointer" }} />
          <div className={classNames(classes.small_navbar_text)}>
            {loginData?.access_token && loginData?.data?.id ? <span onClick={goToAccount}> <Avatar /> </span> : <span onClick={() => setShowLoginModal(true)} className={classNames(classes.noselect)}>Login</span>}
          </div>
        </div>


      </ContentContainer>
    </div>
  );
};

export default SmallNavbarComponent;
