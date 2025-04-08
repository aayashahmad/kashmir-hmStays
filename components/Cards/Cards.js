
import { useState } from "react";
import ImageWithFallback from "../image-with-fallback";

const Cards = ({ blogs, authors }) => {
  const [hovered, sethoverd] = useState(null);
  return (
    <div className="cards_width">
      <div className="All_cards">
        <div className="Head_text">
          <div className="h_image">
            <ImageWithFallback src="/images/cards/trend.png" fill />
          </div>
          <div className="h_text">
            <spnan>Trending on Medium</spnan>
          </div>
        </div>
        <div className="cards_container">
          {blogs?.map((item) => {
            return (
              <div className="card_one">
                <div className="no_pro_tex">
                  <div className="number">
                    <span>{item.id}</span>
                  </div>
                  <div className="profile">
                    <ImageWithFallback src={"/images/tweet-img.jpeg"} fill />
                  </div>

                  <div
                    className="text_profile"
                    onMouseOver={() => sethoverd(item.number)}
                    onMouseLeave={() => sethoverd(null)}
                  >
                    <div className="bold-text">{item.title}</div>
                    <span>{item.page_description}</span>
                  </div>
                </div>
                <div className="bio">
                  <div className="bio_one">
                    <span> {item.title}</span>
                  </div>
                  <div className="bio_two">
                    <span>{item.title}</span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Cards;
