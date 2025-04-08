import * as React from "react";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";
import { useSetRecoilState } from "recoil";
import { selectedPackageTabState } from "../../recoil/atoms/common";

export default function ScrollableTabsButtonForce({ tabs }) {
  //local states
  const [value, setValue] = React.useState(0);

  //recoil states
  const setActiveTab = useSetRecoilState(selectedPackageTabState);

  React.useEffect(() => {
  }, [tabs]);

  const handleChange = (event, newValue) => {
    // console.log("New Value", newValue);
    setActiveTab(tabs[newValue]);
    setValue(newValue);
  };

  return (
    <Box sx={{ maxWidth: { xs: 400, sm: 480 }, bgcolor: "#f5f5f5" }}>
      <Tabs
        value={value}
        onChange={handleChange}
        variant="scrollable"
        scrollButtons
        allowScrollButtonsMobile
        aria-label="scrollable force tabs"
      >
        {tabs.map((tab, index) => (
          <Tab key={index} label={tab.title} />
        ))}
      </Tabs>
    </Box>
  );
}
