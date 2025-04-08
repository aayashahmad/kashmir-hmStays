import React from "react";
import Dialog from "@material-ui/core/Dialog";
import Slide from "@material-ui/core/Slide";
import { makeStyles } from "@material-ui/core/styles";
import styles from "./full-screen-gallery-modal.module.less";
import GallerySlider from "../gallery-slider";
import { Close } from "@mui/icons-material";

const useStyles = makeStyles({
  modal: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  paper: {
    backgroundColor: "white",
  },
});

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const FullScreenGalleryModal = ({ open, onHide, images }) => {
  const classes = useStyles();

  const handleClose = () => {
    onHide();
  };

  return (
    <Dialog
      open={open}
      TransitionComponent={Transition}
      keepMounted
      onClose={handleClose}
      fullScreen
      classes={{
        paper: classes.paper,
      }}
    >
      <div className={styles.gallery_modal_wrapper}>
        <GallerySlider images={images} />

        <div className={styles.cross_button} onClick={handleClose}>
          <Close />
        </div>
      </div>
    </Dialog>
  );
};

export default FullScreenGalleryModal;
