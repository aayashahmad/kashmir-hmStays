import classNames from "classnames";
import React, { use, useEffect, useState } from "react";
import classes from "./home-blog-showcase.module.less";
import { callApi } from "../../services/api/callApi";
import { useRouter } from "next/router";
import { Avatar } from "@mui/material";
import LeftHighlightedTitle from "../left-highlighted-title";
import ImageWithFallback from "../image-with-fallback";
import { AccessTime, DateRange } from "@mui/icons-material";

const explore = [
  {
    id: 0,
    img: "/images/sights/sight1.jpg",
    text: "RELIGIOUS VITSIT / TAGS",
    boldtext: "Blog Title",
    time: "Jun 30,2023 • 4 min read",
    dec: "New year are the perfect time of the year to get rid of hustle bustle of daily activities of city life ...",
  },
  {
    id: 1,
    img: "/images/sights/sight3.jpg",
    text: "RELIGIOUS VITSIT / TAGS",
    boldtext: "Blog Title",
    time: "Jun 30,2023 • 4 min read",
    dec: "New year are the perfect time of the year to get rid of hustle bustle of daily activities of city life ...",
  },
];

const HomeBlogShowcase = () => {
  const router = useRouter();

  //local states
  const [blogs, setBlogs] = useState([]);

  // use effects
  useEffect(() => {
    callApi({
      endPoint: "blogs/list",
      method: "GET",
      callback: (result) => {
        if (result?.status === 200) {
          if (result?.data?.data?.length > 0) {
            setBlogs(result?.data?.data?.reverse());
          }
        } else {
          console.log("error");
        }
      },
    });
  }, []);

  const readBlog = (blog) => {
    router.push(`/blogs/${blog.title.replaceAll(" ", "-")}/${blog.id}`);
  };

  return blogs?.length ? (
    <div className={classNames(classes.explore_parent)}>
      {blogs && (
        <LeftHighlightedTitle
          title={"Explore our Blogs"}
          dec={
            "Unforgettable holiday experiences crafted just for you.Relax, explore, and create cherished memories."
          }
          button={"All Blogs"}
        />
      )}
      <div className={classNames(classes["explore_cards"])}>
        <div className={classNames(classes["explore_left_cards"])}>
          <div
            className={classNames(classes["explore_overlay_image"])}
            onClick={() => readBlog(blogs[0])}
          >
            {blogs && (
              <ImageWithFallback
                src={blogs[0]?.image?.url ?? blogs[0]?.og_image}
                alt={blogs[0]?.image?.alt ?? ""}
                className={classes.hero_image}
                width={500}
                height={300}
              />
            )}
            {blogs !== undefined && blogs !== 0 ? (
              <div className={classNames(classes.overlay_text)}>
                <span
                  className={classNames(classes.overlay_text_avatar)}
                ></span>
                {blogs[0]?.author && (
                  <span className={classNames(classes.overlay_text_one)}>
                    <Avatar sx={{ width: 25, height: 25 }} />
                    {blogs[0]?.author?.first_name +
                      " " +
                      blogs[0]?.author?.last_name}
                  </span>
                )}

                <div
                  className={classNames({
                    [classes.date_time_wrapper]: true,
                    [classes.first_date_time_wrapper]: true,
                  })}
                >
                  <div>
                    <DateRange />
                    <span className={`${classes.date_time_text} `}>
                      {new Date(blogs[0]?.updated_at).toLocaleString()}
                    </span>
                  </div>
                </div>

                <span className={classNames(classes.overlay_text_two)}>
                  {blogs[0]?.title?.split(".")[0] + "..."}
                </span>
                <span
                  dangerouslySetInnerHTML={{
                    __html: blogs[0]?.page_description?.split(".")[0] + "...",
                  }}
                ></span>
              </div>
            ) : null}
          </div>
        </div>
        <div className={classNames(classes["explore_right_cards"])}>
          {blogs?.slice(0, 3)?.map((item, key) => {
            return (
              key > 0 && (
                <div
                  className={classNames(classes["explore_inner_right_cards"])}
                  onClick={() => readBlog(item)}
                  key={key}
                >
                  <div
                    className={classNames(classes["explore_right_cards_img"])}
                  >
                    <ImageWithFallback
                      src={item?.image?.url || item.og_image}
                      alt={item?.image?.alt ?? ""}
                      width={300}
                      height={200}
                    />
                  </div>

                  <div
                    className={classNames(classes["explore_right_cards_text"])}
                  ></div>

                  <div className={classes.date_time_wrapper}>
                    <div>
                      <DateRange />
                      <span className={`${classes.date_time_text} `}>
                        {new Date(item?.updated_at).toLocaleString()}
                      </span>
                    </div>
                  </div>

                  <div
                    className={classNames(
                      classes["explore_right_cards_boldtext"]
                    )}
                  >
                    <span>
                      {item?.page_title.split(" ").slice(0, 7).join(" ")}
                    </span>
                  </div>

                  <div
                    className={classNames(classes["explore_right_cards_time"])}
                  >
                    <span className="blog_date_and_time">{item.time}</span>
                  </div>
                  <div
                    className={classNames(classes["explore_right_cards_dec"])}
                  >
                    <span
                      dangerouslySetInnerHTML={{
                        __html:
                          item?.page_description
                            ?.split(" ")
                            .slice(0, 15)
                            .join(" ") + "...",
                      }}
                    ></span>
                  </div>
                </div>
              )
            );
          })}
        </div>
      </div>
    </div>
  ) : null;
};

export default HomeBlogShowcase;
