import React from "react";
import Slider from "react-slick";
import { Grid, Paper } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import myClasses from "./index.module.less";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: "center",
    color: theme.palette.text.secondary,
  },
}));

const GallerySlider = ({ images }) => {
  const classes = useStyles();
  const settings = {
    dots: true,
    dotsClass: "slick-dots slick-white-dots",
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };

  return (
    <div className={classes.root}>
      <Slider {...settings} className={myClasses.silk_slider_wrapper}>
        {images.map((image, index) => (
          <Grid item xs key={index}>
            <Paper className={classes.paper}>
              <img
                src={image.src}
                alt={`Slide ${index}`}
                className={myClasses.slider_image}
              />
            </Paper>
          </Grid>
        ))}
      </Slider>
    </div>
  );
};

export default GallerySlider;
