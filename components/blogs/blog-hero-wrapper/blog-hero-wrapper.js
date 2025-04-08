import classes from "./blog-hero-wrapper.module.less";
import ContentContainer from "../../content-container/content-container";
import classNames from "classnames";
import ImageWithFallback from "../../image-with-fallback";

const BlogHeroWrapper = ({ image, title }) => {
  return (
    <div className={classes.blog_hero_wrapper_parent}>
      <div className={classes.image_container}>
        <ImageWithFallback
          src={image}
          placeholder="blur"
          fill
          blurDataURL="/images/about-images/kashmirNiravanlogo-removebg-preview.png"
        />
      </div>

      <div
        className={classNames({
          [classes.overlay_content_blog_hero]: true,
          [classes.no_absolute]: !image,
        })}
      >
        <ContentContainer>
          <div
            className={
              classes.blog_hero_wrapper_child_title + " font24 cursive_text"
            }
          >
            <span>{title?.split(".")[0]}....</span>
          </div>
        </ContentContainer>
      </div>
    </div>
  );
};

export default BlogHeroWrapper;
