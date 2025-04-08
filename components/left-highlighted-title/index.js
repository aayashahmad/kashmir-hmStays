import { useRouter } from "next/router";
import classes from "./left-highlighted-title.module.less";
const LeftHighlightedTitle = ({ title, button, dec, size, top }) => {
  const router = useRouter();

  return (
    <div className={classes.left_highlighted_title + ` margin${top ?? 30}`}>
      <div className={classes.title_hero_wrapper}>
        <span className={classes.title_wrapper + ` font${size ?? 18}`}>
          {title}
        </span>
        {button && (
          <div className={classes.left_highlighted_button}>
            <button onClick={() => router.push("/blogs")}>{button}</button>
          </div>
        )}
      </div>
      {dec && <span className={classes.dec_wrapper + " font11"}>{dec}</span>}
    </div>
  );
};

export default LeftHighlightedTitle;
