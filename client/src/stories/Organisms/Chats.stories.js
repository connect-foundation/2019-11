import React from "react";
import ChatSend from "../../components/Organisim/Chat/ChatSend";
import Chat from "../../components/Organisim/Chat/Chat";

export default {
  title: "Organisms|Chats"
};

export const ChatSendComponent = () => {
  return <ChatSend />;
};

const chat = {
  type: "message",
  id: "JJajangMyeon",
  src: "https://i.pravatar.cc/150?img=10",
  text: "화요일은 짜장면을 먹어보면 어떨까요?? 맛있겠다."
};

export const ChatComponent = () => {
  return <Chat chat={chat} />;
};
