import * as React from "react";
import Popover from "@mui/material/Popover";
import Typography from "@mui/material/Typography";
import { Avatar } from "@mui/material";

export default function BasicPopover({
  element,
  setElemet,
  title,
  subTtile,
  Role,
}) {
  const [anchorEl, setAnchorEl] = React.useState(null);

  React.useEffect(() => {
    setAnchorEl(element);
  }, [element]);

  const open = Boolean(anchorEl);
  const id = open ? "simple-popover" : undefined;

  return (
    <div>
      <Popover
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={() => setElemet(null)}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "left",
        }}
      >
        <Typography sx={{ p: 2 }}>
          <div className={classes.BasicPopover_wrapper + "card"}>
            <div className={classes.Avatar}>
              <Avatar />
            </div>
            <div className={classes.author_wrapper}>
              <div>{title}</div>
              <div>{subTtile}</div>
              <div>{Role}</div>
            </div>
          </div>
        </Typography>
      </Popover>
    </div>
  );
}
