import * as React from "react";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import packageStyles from "../../pages/package/package-details.module.less";
import Tag from "../tag";

export default function CustomAccordion({ title, content, tags, key }) {
  return (
    <div className={packageStyles.package_wrapper_parent}>
      <Accordion>
        <div className={packageStyles.package_title_parent}>
          <AccordionSummary
            expandIcon={<ArrowDropDownIcon />}
            aria-controls="panel2-content"
            id="panel2-header"
          >
            <div className={packageStyles.package_title}>
              <span dangerouslySetInnerHTML={{ __html: title }}></span>
            </div>
          </AccordionSummary>
        </div>
        <div className={packageStyles.itinerary_description}>
          <AccordionDetails>
            <Typography>
              {tags ? (
                <div className={packageStyles.tags_wrapper}>
                  {tags?.split("|").map((tag, index) => (
                    <Tag id={index} tag={tag} />
                  ))}
                </div>
              ) : null}
              <div dangerouslySetInnerHTML={{ __html: content }} />
            </Typography>
          </AccordionDetails>
        </div>
      </Accordion>
    </div>
  );
}
