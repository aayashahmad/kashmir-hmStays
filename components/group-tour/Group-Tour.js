import classNames from "classnames";
import { useSetRecoilState } from "recoil";
import { customPackageModalState } from "../../recoil/atoms/common";
import classes from "../group-tour/Group-Tour.module.less";

const GroupTour = () => {
  const setCustomPackageState = useSetRecoilState(customPackageModalState);

  return (
    <div
      className={classNames(classes.GroupTour_parent)}
      onClick={() => setCustomPackageState(true)}
    >
      <div className={classNames(classes.GroupTour_image)}>
        <img src="/images/icons/grouptour.png" alt="" />
      </div>
      <div className={classNames(classes.GroupTour_overly_text)}>
        <div className={classNames(classes.GroupTour_overly_text_one)}>
          <span>Bigger Group? Get special offers up to 50% Off!</span>
        </div>
        <div className={classNames(classes.GroupTour_overly_text_two)}>
          <span>
            We create unforgettable adventures, customised for your group.
          </span>
        </div>
        <div className={classNames(classes.GroupTour_overly_text_three)}>
          <button>Get A Callback</button>
        </div>
      </div>
    </div>
  );
};

export default GroupTour;
