import { Fragment, useEffect, useState } from "react";
import { callApi } from "../../../services/api/callApi";
import ContentContainer from "../../../components/content-container/content-container";
import CustomHead from "../../../components/head";
import MainWrapper from "../../../components/wrapper/wrapper";
import BlogHeroWrapper from "../../../components/blogs/blog-hero-wrapper/blog-hero-wrapper";
import { Avatar } from "@mui/material";
import BasicPopover from "../../../components/popup-modal";
import classes from "./details.module.less";
import MorePackages from "../../../components/more-packages";
import { useRouter } from "next/router";

const Details = () => {
  const [blog, setBlog] = useState(null);
  const [authors, setAuthors] = useState([]);
  const [myAuthor, setMyAuthor] = useState([]);
  const [elemnetInFocus, setElemnetInFocus] = useState(null);

  const router = useRouter();

  // use effects
  useEffect(() => {
    callApi({
      endPoint: "auth/authors",
      method: "GET",
      callback: (result) => {
        if (result?.status === 200) {
          if (result.data?.length > 0) {
            setAuthors(result.data);
          }
        } else {
          console.log("error");
        }
      },
    });
  }, []);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const pathSegments = window.location.pathname.split("/");
      const blogId = pathSegments[pathSegments.length - 1];
      callApi({
        endPoint: "blogs" + "/" + blogId,
        method: "GET",
        callback: (result) => {
          if (result?.status === 200) {
            if (result.data) {
              setBlog(result.data);
            }
          } else {
            console.log("error");
          }
        },
      });
    }
  }, []);

  const getAuthor = (name) => {
    return authors?.find((author) => author?.first_name === name);
  };

  useEffect(() => {
    if (authors?.length && blog) {
      let author = getAuthor(blog?.author);
      setMyAuthor("Author");
    }
  }, [authors, blog]);

  const goToSection = (id) => {
    let element = document.getElementById("section" + id);
    element.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <MainWrapper headerAbsolute={true} headerFixed={false} smallHeader={true}>
      <Fragment>
        {blog && (
          <CustomHead
            pageTitle={blog.page_title}
            metaTitle={blog?.title}
            metaDescription={blog?.meta_description}
            canonical={blog.canonical ? "canonical" : ""}
            ogTitle={blog.og_title}
            ogDescription={blog.og_description}
            ogImage={blog.og_image}
            image={blog.image}
            schemaValue={blog.schema}
          />
        )}
        <div className={classes.route_pages}>
          <BlogHeroWrapper title={blog?.title} image={blog?.image?.url} />

          <ContentContainer>
            <div
              className={classes.page_description}
              dangerouslySetInnerHTML={{
                __html: blog?.page_description,
              }}
            ></div>
            <div className={classes.index_and_content}>
              <div className={classes.index_section + ` card`}>
                {blog?.sections?.map((section, index) => {
                  return (
                    <div
                      className={classes.index_container}
                      onClick={() => goToSection(index)}
                    >
                      <div className={classes.index}>
                        <span>{section.index}</span>
                      </div>
                      <div
                        className={
                          classes.index_text + " font10" + " bold-text"
                        }
                        dangerouslySetInnerHTML={{
                          __html: section.title?.slice(0, 30),
                        }}
                      ></div>
                    </div>
                  );
                })}
              </div>
              <div className={classes.netflix_effect}>
                {blog?.sections?.map((section, index) => {
                  return (
                    <div
                      className={classes.rewind_container}
                      id={`section${index}`}
                    >
                      <div
                        className={classes.rewind_heading}
                        dangerouslySetInnerHTML={{
                          __html: section.title,
                        }}
                      ></div>
                      <div className={classes.rewind_text}>
                        <div
                          className={classes.rewind_upper_text}
                          dangerouslySetInnerHTML={{
                            __html: section.description,
                          }}
                        ></div>
                      </div>
                    </div>
                  );
                })}
                {blog?.author && (
                  <div
                    className={classes.tweet_container + " card"}
                    onMouseEnter={(e) => setElemnetInFocus(e.currentTarget)}
                    onMouseLeave={() => setElemnetInFocus(null)}
                  >
                    {/* {elemnetInFocus && (
                      <BasicPopover
                        element={elemnetInFocus}
                        setElemet={setElemnetInFocus}
                        title={
                          blog?.author?.first_name +
                          " " +
                          blog?.author?.last_name
                        }
                        subTtile={blog?.author?.email}
                        userName={blog?.author?.username}
                        Role={blog?.author?.role}
                        Mobile={blog?.author?.mobile}
                      />
                    )} */}
                    <div className={classes.person}>
                      <div className={classes.person_img}>
                        <Avatar />
                      </div>
                      <div className={classes.person_name_container}>
                        <div className={classes.name}>
                          <div className={classes.person_name}>
                            <span className={classes.font14}>
                              {blog?.author?.first_name}
                            </span>
                            <span className={classes.font14 + " last_name"}>
                              {blog?.author?.last_name}
                            </span>
                          </div>
                          <span>{blog?.author?.email}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
            <MorePackages
              router={router}
              title={"Packages you might like..."}
            />
          </ContentContainer>
        </div>
      </Fragment>
    </MainWrapper>
  );
};

export default Details;
