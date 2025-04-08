import React, { useEffect, useState } from "react";
import AliceCarousel from "react-alice-carousel";
import ContentContainer from "../content-container/content-container";
import classes from "./index.module.less";
import LeftHighlightedTitle from "../left-highlighted-title";
import { callApi } from "../../services/api/callApi";
import FormatQuoteIcon from "@mui/icons-material/FormatQuote";
import { Rating } from "@mui/material";

const Testimonial = () => {
  const [testimonials, setTestimonials] = useState([]);

  const responsive = {
    640: { items: 1 },
    920: { items: 2 },
    1024: { items: 3 },
  };

  useEffect(() => {
    callApi({
      endPoint: `/packages/review/1`,
      method: "GET",
      callback: (result) => {
        if (result?.status === 200) {
          if (Array.isArray(result.data)) {
            setTestimonials(result.data);
            let data = result.data;
            data.push(data[0]);
          } else {
            console.log("Unexpected data format:", result.data);
          }
        } else {
          console.log("Error fetching testimonials:", result);
        }
      },
    });
  }, []);

  return (
    <div className={classes.testimonial_section_wrapper}>
      <ContentContainer>
        <div className={classes.testimonial_parent}>
          <LeftHighlightedTitle title={"Reviews"} size={18} />
          <div className={classes.testimonial_container}>
            <AliceCarousel
              autoPlay
              autoPlayInterval={3000}
              infinite
              disableDotsControls
              responsive={responsive}
              disableButtonsControls={true}
              items={
                testimonials.length > 0
                  ? testimonials.map((item, index) => (
                      <div key={index} className={classes.testimonial_item}>
                        <FormatQuoteIcon
                          style={{
                            height: "100px",
                            width: "100px",
                            textAlign: "center",
                          }}
                        />

                        <div className={classes.testimonial_content}>
                          <span className={classes.name + " font12 bold-text"}>
                            {item.title}
                          </span>
                          <Rating
                            name="read-only"
                            value={item?.stars || 3}
                            readOnly
                            style={{ fontSize: 18 }}
                          />
                          <span
                            className={classes.message + " font10"}
                            dangerouslySetInnerHTML={{
                              __html:
                                item.description?.substring(0, 100) + "...",
                            }}
                          ></span>
                        </div>
                      </div>
                    ))
                  : []
              }
            />
          </div>
        </div>
      </ContentContainer>
    </div>
  );
};

export default Testimonial;
