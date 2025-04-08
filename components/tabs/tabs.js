import classes from "./tabs.module.less";

const Tabs = (props) => {
  const renderTab = (tab, index) => {
    return (
      <div
        className={
          classes.single_tab +
          " " +
          (props.selectedTab == tab ? classes.active : "")
        }
        onClick={() => props.onTabChange(tab)}
        style={{ cursor: "pointer" }}
      >
        {tab}
      </div>
    );
  };

  return (
    <div className={classes.tabs_container}>
      <div className={classes.tabs_container_inner + " font10"}>
        {props.data &&
          props.data.length > 0 &&
          props.data.map((tab, index) => {
            return renderTab(tab, index);
          })}
      </div>
    </div>
  );
};

export default Tabs;
