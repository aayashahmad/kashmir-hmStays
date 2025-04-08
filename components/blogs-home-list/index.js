import { useRouter } from "next/router";
import classes from "./blogs-home-list.module.less";
import ContentContainer from "../content-container/content-container";
import { Avatar } from "@mui/material";
import ImageWithFallback from "../image-with-fallback";
import { DateRange } from "@mui/icons-material";

const BlogsHomeList = ({ blogs, blogTags, authors }) => {
  const router = useRouter();

   let flattenedTags = blogTags
    .map((newBlogTag) => newBlogTag.tags.split("|"))
    .flat();

  let filteredTags = [...new Set(flattenedTags)];

  const handleClick = (blogTag) => {
    router.push(`/blogs?tag=${blogTag}`);
  };

  const sortedBlogs = blogs?.sort((a, b) => new Date(b.updated_at) - new Date(a.updated_at));

  return (
    <ContentContainer>
      <div className={classes.discraption}>
        <div className={classes.discraption_cards}>
          {sortedBlogs?.map((blog) => {
            let author = blog.author;
            return (
              <div
                className={classes.desc_Card}
                key={blog.id}
                onClick={() =>
                  router.push(
                    `/blogs/${blog.title.replaceAll(" ", "-")}/${blog.id}`
                  )
                }
              >
                <div className={classes.left}>
                  <div className={classes.blog_title}>
                    <div className={classes.hdtitle}>
                      <span>{blog.title}</span>
                    </div>
                    {blog?.updated_at && (
                      <div className={classes.date_time_wrapper}>
                        <div>
                          <DateRange />
                          <span className={`${classes.date_time_text} `}>
                            {new Date(blog?.updated_at).toLocaleString()}
                          </span>
                        </div>
                      </div>
                    )}
                    <span
                      className={classes.span_color}
                      style={{ color: "#111" }}
                      dangerouslySetInnerHTML={{
                        __html: blog.page_description,
                      }}
                    ></span>
                  </div>
                  {author && (
                    <div className={classes.author_and_avatar}>
                      <div className={classes.profile_img_card}>
                        <Avatar sx={{ width: 27, height: 27 }} />
                      </div>
                      <span>
                        {author?.first_name + " " + author?.last_name}
                      </span>
                    </div>
                  )}
                </div>
                <div className={classes.right}>
                  <div className={classes.right_image_wrapper}>
                    <ImageWithFallback
                      src={blog?.image?.url ?? "/images/dubai-frame.jpg"}
                      height={1000}
                      width={1000}
                    />
                  </div>
                </div>
              </div>
            );
          })}
        </div>
        <div className={classes.discraption_button}>
          <div className={classes.hdtext}>
            <span>Discover more of what matters to you</span>
          </div>
          <div className={classes.right_buttons}>
            {filteredTags?.map((blogTag) => (
              <button onClick={() => handleClick(blogTag)}>{blogTag}</button>
            ))}
          </div>
        </div>
      </div>
    </ContentContainer>
  );
};

export default BlogsHomeList;
