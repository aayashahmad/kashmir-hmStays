import classNames from "classnames";
import classes from "../gallery-component/index.module.less";

const Gallery = ({ images, title1, title2, title0 }) => {
  return (
    <div className={classNames(classes.working_parent)}>
      <div className={classNames(classes.working_head)}>
        <span className={classNames(classes.working_head1)}>{title0}</span>
        <span className={classNames(classes.working_head2)}>
          {title1}{" "}
          <span className={classNames(classes.working_head3)}>{title2}</span>
        </span>
      </div>
      <div className={classNames(classes.working_body)}>
        {images?.map((item) => {
          return (
            <div className={classNames(classes.inner_working_body)}>
              <img src={item.img} alt="" />
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Gallery;
