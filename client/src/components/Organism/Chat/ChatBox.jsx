import React, { useEffect, useRef, useContext } from "react";
import styled from "styled-components";
import Chat from "./Chat";
import ChatSend from "./ChatSend";
import ModalContext from "../../../context/ModalContext";
import FailModal from "../../Molecules/CustomModal/FailModal";
import ProductPageContext from "../../../context/ProductPageContext";

const ChatBoxStyle = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  border: 1px solid var(--color-gray);
  border-radius: 8px;
`;

const ChatHeader = styled.div`
  padding: var(--padding-sm);
`;

const ChatBody = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
  overflow-y: auto;
`;

const ChatFooter = styled.div`
  display: flex;
  justify-content: center;
  border: 1px solid var(--color-gray);
  border-radius: 8px;
  padding: var(--padding-sm);
`;

const TitleText = styled.span`
  font-weight: bold;
  color: var(--color-darkgray);
`;

const ChatAlert = styled.div`
  padding: var(--padding-md) var(--padding-sm);
`;

const ChatAlertWithBid = styled.div`
  border: 1px solid var(--color-primary);
  padding: var(--padding-sm);
  color: var(--color-primary);
  text-align: center;
  font-size: 0.8rem;
  background-color: var(--color-primary-minus2);
  border-radius: 8px;
`;

const ChatBox = ({ productId, user }) => {
  const chatBodyRef = useRef();
  const [productPageState] = useContext(ProductPageContext);
  const { socketClient, chats } = productPageState;

  const [setModal] = useContext(ModalContext);

  useEffect(() => {
    chatBodyRef.current.scrollTo(0, chatBodyRef.current.scrollHeight);
  });

  const onSubmit = e => {
    e.preventDefault();

    if (Object.keys(user).length === 0) {
      return setModal({
        isOpen: true,
        component: FailModal,
        props: { message: "로그인이 필요합니다." }
      });
    }

    socketClient.emit("message", {
      roomId: productId,
      sender: { ...user, sessionId: socketClient.id },
      type: "message",
      text: e.target.message.value,
      createdAt: Date.now()
    });

    e.target.message.value = "";
  };

  return (
    <ChatBoxStyle>
      <ChatHeader>
        <TitleText>채팅</TitleText>
      </ChatHeader>
      <ChatBody ref={chatBodyRef}>
        {chats.map(chat => {
          return chat.type === "message" ? (
            <Chat key={chat.key} chat={chat} />
          ) : (
            <ChatAlert key={chat.key}>
              <ChatAlertWithBid>{chat.text}</ChatAlertWithBid>
            </ChatAlert>
          );
        })}
      </ChatBody>
      <ChatFooter>
        <ChatSend onSubmit={onSubmit} />
      </ChatFooter>
    </ChatBoxStyle>
  );
};

export default ChatBox;
