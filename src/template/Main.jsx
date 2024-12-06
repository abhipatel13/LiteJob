import {
  AppBar,
  Avatar,
  Badge,
  Box,
  Button,
  Drawer,
  Grid,
  IconButton,
  List,
  Menu,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  MenuItem,
  Toolbar,
  ThemeProvider,
  Dialog,
  DialogTitle,
  DialogContent,
  TextField,
  DialogActions,
} from "@mui/material";

import React, { useEffect } from "react";

import AppIcon from "../assets/icon.svg";

import {
  ChatOutlined,
  Close,
  GridView,
  HandymanOutlined,
  LogoutOutlined,
  Menu as MenuIcon,
  Notifications,
  ReceiptLongOutlined,
  Replay,
  SettingsOutlined,
} from "@mui/icons-material";
import { Link, Outlet, useNavigate } from "react-router-dom";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Logout } from "../redux/slices/auth";
import { businessLogout } from "../redux/slices/businessauth";
import axios from "axios";
import { API_Endpoint, business_ID } from "../components/API";

const DrawerContent = ({ close }) => {
  const history = useNavigate();
  const userAuth = useSelector((state) => state.auth);
  const businessAuth = useSelector((state) => state.businessauth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    if (userAuth.isLoggedIn) {
      dispatch(Logout());
    } else if (businessAuth.isLoggedIn) {
      dispatch(businessLogout());
    }
    navigate("/login");
  };
  const drawerItems =
    location.pathname.split("/")[1] === "user"
      ? [
          {
            name: "Dashboard",
            icon: <GridView />,
            route: "/" + location.pathname.split("/")[1],
          },
          {
            name: "Chats",
            icon: <ChatOutlined />,
            route: "/" + location.pathname.split("/")[1] + "/chats",
          },
          {
            name: "Invoices",
            icon: <ReceiptLongOutlined />,
            route: "/" + location.pathname.split("/")[1] + "/invoices",
          },
          {
            name: "History",
            icon: <Replay />,
            route: "/" + location.pathname.split("/")[1] + "/history",
          },
          {
            name: "Settings",
            icon: <SettingsOutlined />,
            route: "/" + location.pathname.split("/")[1] + "/settings",
          },
        ]
      : [
          {
            name: "Dashboard",
            icon: <GridView />,
            route: "/" + location.pathname.split("/")[1],
          },
          {
            name: "Chats",
            icon: <ChatOutlined />,
            route: "/" + location.pathname.split("/")[1] + "/chats",
          },
          {
            name: "Invoices",
            icon: <ReceiptLongOutlined />,
            route: "/" + location.pathname.split("/")[1] + "/invoices",
          },
          {
            name: "History",
            icon: <Replay />,
            route: "/" + location.pathname.split("/")[1] + "/history",
          },
          {
            name: "Settings",
            icon: <SettingsOutlined />,
            route: "/" + location.pathname.split("/")[1] + "/settings",
          },
          {
            name: "Services",
            icon: <HandymanOutlined />,
            route: "/" + location.pathname.split("/")[1] + "/services",
            user: "bussiness",
          },
        ];

  //   Route to Any Page
  const routeTo = (route) => {
    history(route);
  };

  const [improveDailogOpen, setImproveDailogOpen] = useState(false);
  const improveDailogClose = () => {
    setImproveDailogOpen(false);
  };

  return (
    <Box
      sx={{ minHeight: "100vh" }}
      className="shadow-sm d-flex flex-column justify-content-between "
    >
      <ImproveDailog
        open={improveDailogOpen}
        handleClose={improveDailogClose}
      />
      <Box>
        <Box className="d-flex items-center justify-content-center">
          <Link to="/">
            <h2 className="text-[24px] font-[500] pb-2 text-[#037783] flex justify-center items-center mt-3">
              LiteJob
            </h2>
          </Link>
        </Box>
        <List>
          {drawerItems.map((item, i) => (
            <ListItemButton
              key={"drawer-item-" + i}
              selected={
                location.pathname.split("/").slice(0, 3).join("/") ===
                item.route
              }
              className="me-3"
              sx={{
                my: 0.5,
                py: 1.4,
                borderTopRightRadius: 10,
                borderBottomRightRadius: 10,

                "&.Mui-selected": {
                  backgroundColor: "primary.main",
                  color: "#fff",
                  "&:hover": {
                    backgroundColor: "primary.main",
                    opacity: 0.85,
                  },
                },
              }}
              onClick={() => {
                close();
                routeTo(item.route);
              }}
            >
              <ListItemIcon
                sx={{
                  height: 24,
                  color:
                    location.pathname.split("/").slice(0, 3).join("/") ===
                    item.route
                      ? "#fff"
                      : "",
                }}
              >
                {item.icon}
              </ListItemIcon>
              <ListItemText primary={item.name}></ListItemText>
            </ListItemButton>
          ))}
        </List>
      </Box>

      <Box className="d-flex flex-column gap-3 ">
        <Button
          variant="contained"
          disableElevation
          className="mx-3 "
          sx={{
            textTransform: "none",
            py: 1.4,
          }}
          onClick={() => setImproveDailogOpen(true)}
        >
          How to improve?
        </Button>
        <ListItemButton
          className="mb-4 d-flex gap-2 align-items-center justify-content-center"
          sx={{
            "&:hover": {
              backgroundColor: "transparent",
            },
          }}
          onClick={handleLogout}
        >
          <LogoutOutlined />

          <p className="m-0">Logout</p>
        </ListItemButton>
      </Box>
    </Box>
  );
};

const ImproveDailog = ({ open, handleClose }) => {
  const [description, setDescription] = useState(""); // add this line

  const submitFeedback = async () => {
    try {
      const response = await axios.post(`${API_Endpoint}/business/feedback`, {
        business_ID,
        description,
      });

      if (response.data.success) {
        console.log("Feedback submitted successfully");
        alert("Feedback submitted successfully");
        setDescription("");
      } else {
        console.error("Error submitting feedback");
        // handle error - show an error message
      }
    } catch (error) {
      console.error("Error submitting feedback", error);
      alert("Error submitting feedback");
    }
  };

  return (
    <Dialog
      open={open}
      handleClose={() => handleClose()}
      maxWidth={"sm"}
      fullWidth
    >
      <DialogTitle>
        <Box className="d-flex align-items-center justify-content-between mb-3">
          <h6 className="m-0 fw-bold">How we can improve</h6>
          <IconButton onClick={() => handleClose()}>
            <Close />
          </IconButton>
        </Box>
      </DialogTitle>
      <DialogContent className="d-flex flex-column gap-3">
        <TextField
          multiline
          rows={6}
          label="Description"
          InputLabelProps={{ shrink: true }}
          InputProps={{ disableUnderline: true }}
          size="small"
          variant="filled"
          fullWidth
          value={description} // set the value to description
          onChange={(e) => setDescription(e.target.value)} // update description when the user types
        />
      </DialogContent>
      <DialogActions>
        <Box className="d-flex align-items-center justify-content-center gap-3 w-100 mb-2">
          <Button disableElevation onClick={() => handleClose()}>
            Cancel
          </Button>
          <Button
            variant="contained"
            disableElevation
            onClick={() => {
              submitFeedback();
              handleClose();
            }}
          >
            Send feedback
          </Button>
        </Box>
      </DialogActions>
    </Dialog>
  );
};

function Main() {
  const [drawerOpen, setDrawerOpen] = useState(false);

  return (
    // <ThemeProvider theme={theme}>
    <div>
      <Drawer open={drawerOpen} onClose={() => setDrawerOpen(false)}>
        <Box sx={{ minWidth: "250px" }}>
          <DrawerContent close={() => setDrawerOpen(false)} />
        </Box>
      </Drawer>
      <Grid container className="min-vh-100">
        <Grid
          xl={2}
          item
          className="d-none d-xl-block p-0 m-0 bg-primary"
          sx={{
            position: "relative",
            maxWidth: "300px",
          }}
        >
          <div
            className="bg-white"
            style={{
              position: "fixed",
              top: 0,
              left: 0,
              width: "17%",
              height: "100vh",
            }}
          >
            <DrawerContent close={() => null} />
          </div>
        </Grid>
        <Grid item xs xl={10} className="min-vh-100">
          <AppBar
            className="shadow-none mt-none d-xl-none"
            sx={{
              backgroundColor: "transparent",
              position: "relative",
            }}
          >
            <Toolbar className="d-flex justify-content-between">
              <IconButton onClick={() => setDrawerOpen(true)}>
                <MenuIcon />
              </IconButton>
            </Toolbar>
          </AppBar>

          <Box className="  py-3 h-100  ">
            <Outlet />
          </Box>
        </Grid>
      </Grid>
    </div>
    // </ThemeProvider>
  );
}

export default Main;
