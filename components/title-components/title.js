import classNames from "classnames";
import React from "react";
import classes from "../title-components/title.module.less";
import { useRouter } from "next/router";


const MyTitle = ({ title, boldTitle, button, dec}) => {
    const router = useRouter();
    return (
        <div className={classNames(classes["explore_head"])}>
            <div className={classNames(classes["explore_head_text"])}>
                <div className={classNames(classes["explore_head_text1"])}>
                  <img src="/images/turbus/Nuestros servicios Icon.svg" alt="" />
                    <span className={classNames(classes["explore_t"])}>
                        {title}
                        <span className={classNames(classes.title_parent_special_text)}>{boldTitle}</span>
                    </span>
                </div>
                <div className={classNames(classes["explore_head_text2"])}>{dec && <span>
                    {dec}
                </span>}</div>
            </div>
            {button && <div className={classNames(classes["explore_head_button"])}>
                <button onClick={()=>router.push("/blogs")}>{button}</button>
            </div>}
        </div>
    )
}

export default MyTitle;




