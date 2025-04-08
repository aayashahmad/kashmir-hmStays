import React, { useEffect, useState } from "react";
import CustomHead from "../../components/head";
import { callApi } from "../../services/api/callApi";
import MainWrapper from "../../components/wrapper/wrapper";
import { useRouter } from "next/router";
import BlogsHeroShowcase from "../../components/blogs-hero-showcase";
import BlogsHomeList from "../../components/blogs-home-list";

const BlogsHome = () => {
  const [blogs, setBlogs] = useState([]);
  const [authors, setAuthors] = useState([]);
  const [schemaValue, setSchemaValue] = useState([]);
  const [blogTags, setBlogTags] = useState([]);

  const router = useRouter();

  const blogTag = router?.query?.tag || null;

  // use effects
  useEffect(() => {
    callApi({
      endPoint: "blogs/list",
      method: "GET",
      callback: (result) => {
        if (result?.status === 200) {
          if (result?.data?.data?.length > 0) {
            setBlogs(result?.data?.data);
            setBlogTags(result?.data?.data);
          }

          if (result?.data?.authors?.length > 0) {
            setAuthors(result?.data?.authors);
          }
        } else {
          console.log("error");
        }
      },
    });
  }, []);

  useEffect(() => {
    callApi({
      endPoint: `blogs/list/tag?tag=${blogTag}`,
      method: "GET",
      callback: (result) => {
        if (result?.data?.data?.length > 0) {
          setBlogs(result.data.data.reverse());
        } else {
          console.log("error");
        }
      },
    });
  }, [blogTag]);

  useEffect(() => {
    callApi({
      endPoint: `schema/schema_value/?ref_page=${router.pathname}`,

      method: "GET",
      callback: (result) => {
        if (result?.status === 200) {
          if (result?.data?.schema_value?.value) {
            setSchemaValue(result?.data?.schema_value?.value);
          }
        } else {
          console.log("error");
        }
      },
    });
  }, []);

  return (
    <MainWrapper headerAbsolute={true} headerFixed={false} smallHeader={true}>
      {schemaValue && <CustomHead schemaValue={schemaValue.value} />}
      <BlogsHeroShowcase
        title={"Top Trending Blogs..."}
        desc={"Discover attractive destinations, Activities and more..."}
      />
      <BlogsHomeList blogs={blogs} blogTags={blogTags} authors={authors} />
    </MainWrapper>
  );
};

export default BlogsHome;
