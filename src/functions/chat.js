import axios from "axios";

export const sendSms = async (phoneNumber, message) => {
  try {
    let chatData1; // Declare chatData1 outside of the if-else block

    // Step 1: Create Conversation
    const createConversationResponse = await axios.post(
      "http://localhost:5500/api/v1/chat/createConversation",
      {
        businessId: "64a96cbd3fc1727eec1192aa",
        userId: "65791270eb3282fc2a2c3671",
      }
    );

    if (
      createConversationResponse.data.message === "Channel is already exists"
    ) {
      const chatData = new FormData();
      chatData.append("conversationId", "CHcc664e0765a047c0becb0f9d2ff480a4");
      chatData.append("senderId", "655f9206b2f959b0cdbf7c49");
      chatData.append("message", "Hello");

      // Step 2: Send Message
      const sendMessageResponse1 = await axios.post(
        "http://localhost:5500/api/v1/chat/sendMessage",
        chatData
      );

      // Handle the response from sending the message
      console.log("Message sent successfully 1:", sendMessageResponse1.data);

      return;
    } else {
      // Fetch user conversations
      console.log("Get all user Convo");
      const GetUserMessage = await axios.get(
        "http://localhost:5500/api/v1/chat/getAllConversatioinsById?id=655f9206b2f959b0cdbf7c49&type=User"
      );

      // Log the entire response
      console.log("User Conversations:", GetUserMessage.data);

      // Access the channel_id from the first element of the chats array
      const conversationId = GetUserMessage.data.chats[0].channel_id;

      // Log the channel_id
      console.log("Channel ID is:", conversationId);

      // Create FormData with the obtained conversationId
      chatData1 = new FormData();
      chatData1.append("conversationId", conversationId);
      chatData1.append("senderId", "655f9206b2f959b0cdbf7c49");
      chatData1.append("message", "Hello");
    }

    // Step 2: Send Message
    const sendMessageResponse2 = await axios.post(
      "http://localhost:5500/api/v1/chat/sendMessage",
      chatData1
    );

    // Handle the response from sending the message
    console.log("Message sent successfully 2:", sendMessageResponse2.data);
    return;
  } catch (error) {
    console.error("Error:", error);
  }
};
