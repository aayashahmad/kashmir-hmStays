import { useEffect, useState } from "react";
import { callApi } from "../../services/api/callApi";
import classes from "./blog-line.module.less";
import LeftHighlightedTitle from "../left-highlighted-title";
import ImageWithFallback from "../image-with-fallback";

const BlogLine = ({ title, router }) => {
  const [blogs, setBlogs] = useState([]);

  useEffect(() => {
    callApi({
      endPoint: "blogs/list",
      method: "GET",
      callback: (result) => {
        if (result?.status === 200) {
          setBlogs(result.data?.data?.slice(0, 3));
        } else {
          console.log("error");
        }
      },
    });
  }, [router]);

  console.log("LOG___ blogs", blogs);

  return (
    <>
      <div>
        {title && (
          <div style={{ marginBottom: "20px" }}>
            <LeftHighlightedTitle title={title} />
          </div>
        )}
      </div>
      <div className={classes.blog_line_wrapper}>
        {blogs?.map((blog, index) => {
          return (
            <div
              className={classes.blog_line_container}
              onClick={() =>
                router.push(
                  `/blogs/${blog.title.replaceAll(" ", "-")}/${blog.id}`
                )
              }
            >
              <div className={classes.blog_line}>
                <div className={classes.blog_line_image}>
                  <ImageWithFallback
                    src={blog?.image?.url}
                    alt="loding.."
                    height={100}
                    width={2000}
                  />
                </div>
                <div className={classes.blog_line_details}>
                  <div className={classes.blog_line_title}>
                    <span className="font11 bold-text"> {blog?.title}</span>
                  </div>
                  <div className={classes.blog_line_description}>
                    <span className="font10"> {blog?.meta_description}</span>
                  </div>
                </div>
              </div>
              {index < blogs.length - 1 && (
                <div className={classes.blog_line_seperator}></div>
              )}
            </div>
          );
        })}
      </div>
    </>
  );
};

export default BlogLine;
