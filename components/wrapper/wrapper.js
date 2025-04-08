import classes from "./wrapper.module.less";
import KuposFooter from "../footer/kupos-footer";
import SmallNavbarComponent from "../nav-bar/small-nav-bar/small-navbar";
import MobileMenu from "../nav-bar/hamburger-menu/hamburger";

const MainWrapper = ({
  children,
  headerFixed,
  headerAbsolute,
  smallHeader,
}) => {
  return (
    <div className={classes.main_wrapper}>
      {smallHeader ? (
        <div>
          <SmallNavbarComponent />
          <MobileMenu />
        </div>
      ) : (
        <SmallNavbarComponent />
      )}
      {children}
      <KuposFooter />
    </div>
  );
};

export default MainWrapper;
