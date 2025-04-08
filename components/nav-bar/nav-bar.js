import TopLinks from "./top-links";
import classNames from "classnames";
import classes from "./nav-bar.module.less";
import { useRouter } from "next/router";
import ContentContainer from "../content-container/content-container";

const NavBarComponent = (props) => {
  const { t } = props;
  const router = useRouter();

  return (
    <div>
      {
        <nav
          className={classNames({
            [classes.main_nav_container]: true,
            [classes.main_nav_container_fixed_header]: props.headerFixed,
            [classes.main_nav_container_absolute_header]: props.headerAbsolute,
          })}
        >
          <ContentContainer>
            <div className={classes.nav_container + " content-container"}>
              <div className={classes.logo}>
                <a
                  href={"/" + router.locale}
                  style={{
                    display: "inline-block",
                  }}
                >
                  <img src={"/images/logo2.png"} />
                </a>
              </div>

              <div className={classes.links_container + " font10"}>
                <ul className={classes.links_style}>
                  <TopLinks t={t} headerFixed={props.headerFixed} />
                </ul>
              </div>
            </div>
          </ContentContainer>
        </nav>
      }
    </div>
  );
};

export default NavBarComponent;
