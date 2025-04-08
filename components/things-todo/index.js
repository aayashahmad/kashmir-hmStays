import React, { useState } from "react";
import classes from "../things-todo/index.module.less";
import { useRouter } from "next/router";
import LeftHighlightedTitle from "../left-highlighted-title";

const ThingsTodo = ({ location }) => {
  const router = useRouter();
  const [link, setlink] = useState([
    { id: 1, title: "link1" },
    { id: 2, title: "link2" },
    { id: 3, title: "link3" },
    { id: 4, title: "link4" },
    { id: 5, title: "link5" },
    { id: 6, title: "link6" },
    { id: 7, title: "link7" },
    { id: 8, title: "link8" },
  ]);
  const GoToTodoPage = () => {
    router.push("/destinations/srinagar/tours");
  };
  return (
    <div className={classes.todo_wrapper}>
      <div className={classes.todo_title}>
        <LeftHighlightedTitle title={`More Things To Do In ${location}`} />
      </div>
      <div className={classes.todo_links} onClick={GoToTodoPage}>
        {link?.map((link) => {
          return <span key={link.id}>{link.title}</span>;
        })}
      </div>
    </div>
  );
};

export default ThingsTodo;
