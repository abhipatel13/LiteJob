import { faker } from "@faker-js/faker";
import {
  Avatar,
  Box,
  Card,
  Chip,
  Container,
  Grid,
  List,
  ListItemButton,
  TextField,
} from "@mui/material";
import axios from "axios";
// import { Chat as TwilioChat } from "twilio";
import moment from "moment";
import { useEffect, useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";

function Chats() {
  const history = useNavigate();
const [allChats, setallChats] = useState([])
  const routeTo = (route ,user_id) => {
    window.innerWidth > 575 ? history(route,{ state: {
      userId: user_id
    }}) : history("open/" + route ,{ state: {
      userId: user_id
    }});
  };

  const getAllChats = async () => {
    const response = await axios.get(
      `http://localhost:5500/api/v1/chat/getAllConversatioinsById?id=${localStorage.getItem(
        "userid"
      )}&businessId=${localStorage.getItem("businessId")}&type=${localStorage.getItem(
        "type"
      )}`
    );
    console.log(response);
    setallChats(response?.data?.chats);
  };

  useEffect(() => {
    getAllChats()
  }, [])
  
  return (
    <Container style={{width: "100%"}}>
      <Card className="shadow-sm rounded  d-flex flex-column h-100">
        <Grid container style={{ height: "98vh" }}>
          <Grid
            item
            xs={12}
            md={5}
            sm={6}
            lg={4}
            xl={3}
            className=" border-end"
            style={{ height: "100%" }}
          >
            <Box
              className=" p-4 d-flex align-items-center  gap-2 border-bottom"
              sx={{ height: "80px" }}
            >
              <h6 className="m-0">Messages</h6>
              <Chip
                size="small"
                className="px-1"
                label="2"
                color="primary"
                sx={{ py: 0, height: "19px" }}
              />
            </Box>
            <Box className="p-3">
              <TextField
                variant="outlined"
                placeholder="Search Messages"
                fullWidth
              />
            </Box>
            <List className=" px-3 d-flex flex-column gap-3">
              {allChats.map((chat, i) => (
                <ListItemButton
                  key={i}
                  selected={location.pathname.split("/")[3] == i}
                  sx={{ borderRadius: 2 }}
                  onClick={() => routeTo(chat?.channel_id + "" , localStorage.getItem("type") =="User" ?chat?.business_id : chat?.user_id )}
                >
                  <Box className="d-flex align-items-start justify-content-between w-100">
                    <Box className="d-flex align-items-center gap-2">
                      <Avatar
                        sx={{
                          borderRadius: 1,
                          height: 60,
                          width: 60,
                        }}
                        src={faker.image.avatarLegacy()}
                      ></Avatar>
                      <div>
                        <p className="fw-bold m-0">
                          {chat?.user_name}
                        </p>
                        <p className="text-muted m-0">Hey!</p>
                      </div>
                    </Box>
                    <Box>
                      <p
                        className="text-muted m-0"
                        style={{ fontSize: "14px" }}
                      >
                        {moment().format("DD/MM/YYYY")}
                      </p>
                    </Box>
                  </Box>
                </ListItemButton>
              ))}
            </List>
          </Grid>
          <Grid item xs style={{ height: "100%" }}>
            <Outlet></Outlet>
          </Grid>
        </Grid>
      </Card>
    </Container>
  );
}

export default Chats;
