import React from "react";
import classes from "./blogs-hero-showcase.module.less";
import ContentContainer from "../content-container/content-container";

const BlogsHeroShowcase = ({ title, desc }) => {
  return (
    <div className={classes.body_text}>
      <ContentContainer>
        <div className={classes.text_image}>
          <div className={classes.texts}>
            <div className={classes.big_text}>
              <span>{title}</span>
            </div>
            <div className={classes.small_text}>
              <span>{desc}</span>
            </div>
          </div>
        </div>
      </ContentContainer>
    </div>
  );
};

export default BlogsHeroShowcase;
