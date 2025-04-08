import classNames from "classnames";

const ContentContainer = (props) => {
  return (
    <div className={classNames(['content-container', ...(props.classNames || [])])} style={props.style} >
      {props.children}
    </div>
  );
};

export default ContentContainer;
