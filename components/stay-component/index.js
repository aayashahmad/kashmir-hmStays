import React, { useEffect, useState } from "react";
import classes from "./stay.module.less";
import { Check } from "@mui/icons-material";
import LeftHighlightedTitle from "../left-highlighted-title";

const StayTypes = ({ variations, setSelectedChoice, discount }) => {
  const [stay, setStay] = useState([]);

  useEffect(() => {
    if (variations?.length > 0) {
      const orderedVariations = [
        "Standard",
        "Deluxe",
        "Super Deluxe",
        "Luxury",
      ];
      setStay(
        orderedVariations
          .map((name, index) => ({
            id: index,
            name,
            value: variations.find((item) => item.name === name)?.value || 0,
            active: index === 0 ? true : false,
          }))
          .filter((item) => item.value > 0)
      );
    }
  }, [variations]);

  const stayClick = (id) => {
    setSelectedChoice(stay[id]);
    setStay((prevStay) =>
      prevStay.map((item) =>
        item.id === id ? { ...item, active: true } : { ...item, active: false }
      )
    );
  };

  return (
    <div className={classes.stay_wrapper + " card"}>
      <LeftHighlightedTitle title={"Stay Category"} />

      <div className={classes.inner_stay_wrapper}>
        {stay.map((item) => (
          <div
            key={item.id}
            className={`${classes.stay_name} ${
              item.active ? classes.active : classes.inactive
            }`}
            onClick={() => stayClick(item.id)}
          >
            {item.active ? (
              <div className={classes.check}>
                <Check
                  className={classes.Check_icon}
                  style={{ marginTop: "-4px" }}
                  fontSize="30"
                />
              </div>
            ) : null}
            <span className="font10 bold-text"> {item.name}</span>
            <span className="font8">
              {item.value - (item.value * discount) / 100}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default StayTypes;
