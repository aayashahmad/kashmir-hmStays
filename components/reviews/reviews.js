import React, { useEffect, useState } from "react";
import classes from "./reviews.module.less";
import classNames from "classnames";
import { callApi } from "../../services/api/callApi";
import { Star } from "@mui/icons-material";

const Reviews = ({ packId, packName }) => {
  const [reviews, setReviews] = useState([]);
  const [ratingBar, setRatingBar] = useState([]);

  useEffect(() => {
    callApi({
      endPoint: "packages/review" + "/" + packId,
      method: "GET",
      callback: (res) => {
        if (res && res.data) {
          setReviews(res.data);
        }
      },
    });
  }, [packId]);

  useEffect(() => {
    let fiveStarCount = reviews.filter((review) => review.stars === 5).length;
    let fourStarCount = reviews.filter((review) => review.stars === 4).length;
    let threeStarCount = reviews.filter((review) => review.stars === 3).length;
    let twoStarCount = reviews.filter((review) => review.stars === 2).length;
    let oneStarCount = reviews.filter((review) => review.stars === 1).length;

    let myRatings = [];

    myRatings.push({
      starRatingUsers: fiveStarCount,
      starRating: 5,
      total: reviews.length,
    });
    myRatings.push({
      starRatingUsers: fourStarCount,
      starRating: 4,
      total: reviews.length,
    });
    myRatings.push({
      starRatingUsers: threeStarCount,
      starRating: 3,
      total: reviews.length,
    });
    myRatings.push({
      starRatingUsers: twoStarCount,
      starRating: 2,
      total: reviews.length,
    });
    myRatings.push({
      starRatingUsers: oneStarCount,
      starRating: 1,
      total: reviews.length,
    });

    setRatingBar(myRatings);
  }, [reviews]);

  let totalStars = reviews.reduce((acc, reduce) => {
    return acc + reduce.stars;
  }, 0);

  return (
    <>
      <div className={classNames(classes.review_main_container)}>
        <span className={classes.review_main_title}>
          Reviews ({reviews.length})
        </span>
        <div className={classes.review_main_wrapper}>
          {reviews?.map((item, index) => {
            return (
              <>
                {index === 0 && (
                  <div className={classes.logo_rating_bar_wrapper}>
                    <div className={classes.star_rating_logo}>
                      <img src="/images/stars.png" />
                      <div className={classes.average_rating}>
                        {totalStars / reviews.length}
                      </div>
                    </div>
                    <div className={classes.rating_parent_wrapper}>
                      {ratingBar.map((ratingBarItem) => (
                        <div className={classes.rating_wrapper}>
                          <div className={classes.title_percentage_wrapper}>
                            <div className={classes.progress_percentage}>
                              {ratingBarItem.starRating}
                              <Star />
                            </div>
                          </div>

                          <div className={classes.progress_line_wrapper}>
                            <div className={classes.out_line}>
                              <div
                                className={classes.inner_line}
                                style={{
                                  width:
                                    (ratingBarItem.starRatingUsers /
                                      reviews.length) *
                                      100 +
                                    "%",
                                }}
                              ></div>
                            </div>
                          </div>
                          <div className={classes.star_rating_users}>
                            {" "}
                            ({ratingBarItem.starRatingUsers})
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
                <div className={classes.review_rating_box}>
                  <div className={classes.title_rating_star_wrapper}>
                    <div className={classes.reviewer_name}>{item.title}</div>
                    <div className={classes.feedback_rating_}>
                      {item.stars}
                      <Star />
                    </div>
                  </div>
                  <div className={classes.booked_package_wrapper}>
                    <span className={classes.booked_package_title}>
                      Booked :{" "}
                    </span>
                    <span className={classes.booked_package_name}>
                      {packName}
                    </span>
                  </div>
                  <div
                    className={classes.reviewer_description}
                    dangerouslySetInnerHTML={{ __html: item.description }}
                  ></div>
                </div>
              </>
            );
          })}
        </div>
      </div>
    </>
  );
};

export default Reviews;
