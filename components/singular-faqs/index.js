import React, { useEffect, useState } from "react";
import classnames from "classnames";
import classes from "./index.module.less";

const SingularFaqs = ({ faqs }) => {
  const [showFaqs, setShowFaqs] = useState(true);
  const [allFaqs, setAllFaqs] = useState([]);

  useEffect(() => {
    let faqsLocal = [];
    if (faqs && faqs.length > 0) {
      faqs?.forEach((item, index) => {
        faqsLocal.push({
          id: index,
          show: false,
          icon1: "+",
          icon2: "−",
          question: item.question,
          answer: item.answer,
        });
      });
      setAllFaqs(faqsLocal);
    }
  }, [faqs]);

  const showHide = (id) => {
    let localItems = [];

    allFaqs.forEach((item) => {
      if (item.id === id) {
        localItems.push({ ...item, show: !item.show });
      } else {
        localItems.push({ ...item, show: false });
      }
    });

    setAllFaqs(localItems);
  };

  return (
    <div className={classnames(classes.left_container)}>
      <div className={classnames(classes.head_text)}>
        <div className={classnames(classes.inner_head_text_parent)}>
          <div
            className={classnames(classes.inner_head_text)}
            onClick={() => setShowFaqs(!showFaqs)}
          >
            <span>Faqs</span>
            <img
              src={
                showFaqs ? "/images/icons/down1.png" : "/images/icons/up2.png"
              }
              alt="arrow"
            />
          </div>
          {showFaqs && (
            <div className={classnames(classes.inner_left_container)}>
              {allFaqs?.map((item) => {
                return (
                  <div
                    className={classnames(classes.left_body_text)}
                    onClick={() => showHide(item.id)}
                  >
                    <span
                      className={classnames([
                        classes.faq_action_btn,
                        classes.rotate180,
                      ])}
                    >
                      {item.show ? item.icon2 : item.icon1}
                    </span>
                    <div className={classnames(classes.showcontent)}>
                      <span>{item.question}</span>
                      {item.show && (
                        <div className={classnames(classes.show_text)}>
                          <span dangerouslySetInnerHTML=
                            {{
                              __html: item?.answer,
                            }}>
                          </span>
                        </div>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
export default SingularFaqs;
