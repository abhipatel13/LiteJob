import { Notifications } from "@mui/icons-material";
import {
  Avatar,
  Badge,
  Box,
  Divider,
  Grid,
  IconButton,
  Menu,
  MenuItem,
  TextField,
} from "@mui/material";
import React from "react";

const DashboardHeadElement = ({businessName}) => (
  <Box className="d-flex align-items-center gap-3 w-100">
    <h4 className="m-0 d-none d-xl-block min-w-[170px]">Welcome back, {businessName || ""}</h4>
    <Divider
      orientation="vertical"
      flexItem
      className="d-none d-lg-block"
      sx={{
        width: '1px',
        backgroundColor: '#000000',
      }}
    />    <Grid item xs={12} className="d-flex flex-column gap-3">
      <p className="m-0 font-weight-bold">
        You have 3 new messages and 4 new notifications!
      </p>
    </Grid>
  </Box>
);

function Header({ Data }) {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const handleClose = () => {
    setAnchorEl(false);
  };
  const userDataString = localStorage.getItem('user');
  const user = JSON.parse(userDataString);
  const businessName = user.BusinessName; 
  return (
    <Box className="d-flex flex-column-reverse w-100  align-items-end gap-3 flex-md-row align-items-md-center  justify-content-between">
      <Box className="d-flex gap-3 align-items-center justify-content-between w-100 ">
        {Data ? (
          Data
        ) : location.pathname === "/user" ||
          location.pathname === "/business" ? (
          <DashboardHeadElement businessName={businessName} />
        ) : (
          <h4 className="text-capitalize m-0 ">
            {location.pathname.split("/")[2]}
          </h4>
        )}

        <div className="d-flex align-items-center gap-2">
          <IconButton className="border">
            <Badge color="primary" variant="dot" invisible={false}>
              <Notifications />
            </Badge>
          </IconButton>
          <Box>
            <IconButton
              className="p-0"
              onClick={(e) => setAnchorEl(e.currentTarget)}
            >
              <Avatar />
            </IconButton>
            <Menu
              id="basic-menu"
              anchorEl={anchorEl}
              open={Boolean(anchorEl)}
              onClose={handleClose}
              MenuListProps={{
                "aria-labelledby": "basic-button",
              }}
            >
              <MenuItem onClick={handleClose}>Profile</MenuItem>
              <MenuItem onClick={handleClose}>My account</MenuItem>
              <MenuItem onClick={handleClose}>Logout</MenuItem>
            </Menu>
          </Box>
        </div>
      </Box>
    </Box>
  );
}

export default Header;
