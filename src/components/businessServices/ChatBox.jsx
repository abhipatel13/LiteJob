import React, { useEffect, useState } from "react";
import dummyPerson from "../images/dummyPerson.png";
import { sendSms } from "../../functions/chat";
import io from "socket.io-client";
import axios from "axios";

// Import socket
const socket = io.connect("http://localhost:5500");

function ChatBox({ setShowChatBox }) {
  const [messageValue, setMessageValue] = useState("");
  const [messageList, setMessageList] = useState([]);

  const channelExists = async () => {
    try {
      const response = await axios.get(
        `http://localhost:5500/api/v1/chat/getAllChatsByChannelId?id=${
          JSON.parse(localStorage.getItem("user"))._id
        }&type=User`
      );

      console.log(response.data);
    } catch (error) {
      console.log(error.message);
    }
  };

  useEffect(() => {
    channelExists();
    socket.emit("connect_user", JSON.parse(localStorage.getItem("user")).id);
    // Listen for received-sms events from the server
    socket.on("received-sms", (data) => {
      setMessageList([...messageList, data.message]);
    });

    return () => {
      // Cleanup the event listener when the component unmounts
      socket.off("received-sms");
    };
  }, [messageList]);

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      sendMessage();
    }
  };

  const sendMessage = async () => {
    if (messageValue.trim() !== "") {
      try {
        socket.emit("sendMessage", {
          senderId: JSON.parse(localStorage.getItem("user")).id,
          receiverId: "64a96b5a3fc1727eec11929e",
          conversationId: "CH055f629f05144948ae188667a163e17d",
          message: messageValue,
        });

        setMessageList([...messageList, messageValue]);
        setMessageValue("");
      } catch (error) {
        console.error("Error sending message:", error.message);
        // Handle the error as needed
      }
    }
  };

  return (
    <div className="w-full">
      {/* <div
        className=" absolute -bottom-16 right-0 bg-white rounded-2xl p-4 shadow-xl border cursor-pointer"
        onClick={() => setShowChatBox(false)}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="w-6 h-5"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M6 18L18 6M6 6l12 12"
          />
        </svg>
      </div> */}
      <div className="bg-white rounded-2xl p-4 shadow-xl border relative mb-3">
        <div className="w-full flex justify-between items-center">
          <div className="flex items-center justify-start gap-3">
            <div className="relative">
              <img src={dummyPerson} alt="dummy" className="w-8 rounded-full" />
              <div className="absolute -right-0 bottom-0 text-transparent bg-green-400 h-2.5 w-2.5 rounded-full">
                .
              </div>
            </div>
            <p className="font-semibold">Annie Smith</p>
          </div>
          <svg
            fill="none"
            stroke="currentColor"
            stroke-width="1.5"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
            aria-hidden="true"
            className="h-6"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M12 6.75a.75.75 0 110-1.5.75.75 0 010 1.5zM12 12.75a.75.75 0 110-1.5.75.75 0 010 1.5zM12 18.75a.75.75 0 110-1.5.75.75 0 010 1.5z"
            ></path>
          </svg>
        </div>

        <div className="h-64 relative">
          <div className="h-52 py-4 overflow-auto">
            {messageList.map((message, index) => (
              <div dir="rtl" className="pb-2">
                <p>{message}</p>
              </div>
            ))}
          </div>
          <div className="flex justify-start items-center absolute bottom-0 gap-5 w-full">
            <input
              type="text"
              className="rounded-3xl border-transparent focus:outline-none focus:border-primary focus:ring-0 w-full"
              placeholder="Enter Message"
              value={messageValue}
              onChange={(e) => setMessageValue(e.target.value)}
              id="message-input"
              onKeyPress={handleKeyPress}
            />
            <svg
              fill="none"
              stroke="currentColor"
              stroke-width="1.5"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
              aria-hidden="true"
              className="h-6 cursor-pointer"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M12 10.5v6m3-3H9m4.06-7.19l-2.12-2.12a1.5 1.5 0 00-1.061-.44H4.5A2.25 2.25 0 002.25 6v12a2.25 2.25 0 002.25 2.25h15A2.25 2.25 0 0021.75 18V9a2.25 2.25 0 00-2.25-2.25h-5.379a1.5 1.5 0 01-1.06-.44z"
              ></path>
            </svg>
            <svg
              fill="none"
              stroke="currentColor"
              stroke-width="1.5"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
              aria-hidden="true"
              className="h-6 cursor-pointer"
              onClick={sendMessage}
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M6 12L3.269 3.126A59.768 59.768 0 0121.485 12 59.77 59.77 0 013.27 20.876L5.999 12zm0 0h7.5"
              ></path>
            </svg>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ChatBox;
