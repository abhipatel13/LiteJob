import styled from "@emotion/styled";
import { faker } from "@faker-js/faker";
import {
  FileOpenOutlined,
  PhotoOutlined,
  SendOutlined,
} from "@mui/icons-material";
import { Avatar, Box, IconButton, InputBase } from "@mui/material";
import axios from "axios";
import { useEffect, useState } from "react";
import { useLocation, useParams } from "react-router-dom";
import io from "socket.io-client";
const socket = io("http://localhost:5500");

const VisuallyHiddenInput = styled("input")({
  clip: "rect(0 0 0 0)",
  clipPath: "inset(50%)",
  height: 1,
  overflow: "hidden",
  position: "absolute",
  bottom: 0,
  left: 0,
  whiteSpace: "nowrap",
  width: 1,
});

function ChatMessages() {
  const params = useParams();
  const location = useLocation();
  const { userId } = location.state;
  const [Messages, setMessages] = useState([]);
  const [newMessage, setnewMessage] = useState("");

  const getChat = async (channelId) => {
    const response = await axios.get(
      `http://localhost:5500/api/v1/chat/getAllChatsByChannelId?id=${channelId}&type=${localStorage.getItem("type")}`
    );
    console.log(response);
    setMessages(response?.data?.chats);
  };
  
  useEffect(() => {
    socket.emit("connect_user", localStorage.getItem("userid"));
    getChat(params?.id);
  }, [params?.id]);
  socket.on("userStatus", (data) => {
    console.log("dasdasds", data);
  });

  const handleSendMessage = () => {
    socket.emit("sendMessage", {
      senderId: localStorage.getItem("userid"),
      receiverId: userId,
      businessId: localStorage.getItem("businessId"),
      conversationId: Messages[0]?.conversationSid,
      message: newMessage,
      senderSocketId: socket.id,
    });
    setnewMessage("");
  };

  useEffect(() => {
    const handlePrivateMessage = (data) => {
      console.log('Received private message:', data);
      setMessages(prev => [...prev, data]);
    };

    // Listen for 'privateMessage' event only once when the component mounts
    socket.on('privateMessage', handlePrivateMessage);

    // Clean up the event listener when the component unmounts
    return () => {
      socket.off('privateMessage', handlePrivateMessage);
    };
  }, []);

  useEffect(() => {
   
    socket.emit("connect_user", localStorage.getItem("userid"));
    getChat(params?.id);
  }, [params?.id]);
  return (
    <Box className="h-100  d-flex flex-column mx-3 shadow">
      <Box
        className=" p-4 d-flex align-items-center gap-2 border-bottom"
        sx={{ height: "80px" }}
      >
        <div className="d-flex gap-2">
          <Avatar
            src={faker.image.avatarLegacy()}
            sx={{ borderRadius: 1, height: 50, width: 50 }}
            className="border"
          ></Avatar>
          <div className="d-flex flex-column justify-content-between py-1">
            <h6 className="m-0 ">{faker.person.firstName()}</h6>
            <div
              className="m-0 d-flex align-items-center gap-2"
              style={{ fontSize: "12px" }}
            >
              {" "}
              <Box
                className="bg-success"
                style={{ height: "8px", width: "8px", borderRadius: "50%" }}
              ></Box>{" "}
              Online
            </div>
          </div>
        </div>
      </Box>
      <Box
        sx={{ flex: 1 }}
        className="d-flex flex-column gap-3 align-items-start p-4 overflowY-auto"
      >
        {Messages?.map((message) => {
          return (
            <Box
              key={message?.sid}
              className={`bg-primary text-white p-2 rounded ${
                message?.author === localStorage.getItem("userid")
                  ? "align-self-end"
                  : "align-self-start"
              }`}
              sx={{ maxWidth: "350px" }}
            >
              {message?.body}
            </Box>
          );
        })}
      </Box>
      <Box className="mx-2 mx-sm-4 d-flex gap-2 align-items-center my-4 border rounded">
        <InputBase
          fullWidth
          sx={{ p: 2 }}
          placeholder="Message...."
          variant=""
          value={newMessage}
          onChange={(e) => {
            setnewMessage(e.target.value);
          }}
        ></InputBase>
        <IconButton>
          <VisuallyHiddenInput type="file" />
          <PhotoOutlined />
        </IconButton>
        <IconButton>
          <VisuallyHiddenInput type="file" />
          <FileOpenOutlined />
        </IconButton>
        <IconButton color="primary" onClick={handleSendMessage}>
          <SendOutlined />
        </IconButton>
      </Box>
    </Box>
  );
}

export default ChatMessages;
