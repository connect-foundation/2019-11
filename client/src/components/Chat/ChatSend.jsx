import React from "react";
import styled from "styled-components";

const ChatSendStyle = styled.div`
  display: flex;
  justify-content: center;
  width: 100%;
`;

const ChatInput = styled.input`
  flex: 1;
  border: 1px solid var(--color-gray);
  border-radius: 8px;
  padding: var(--padding-sm);
  font-size: 0.8rem;
`;

const SendButton = styled.button`
  width: 48px;
  border: 1px solid var(--color-darkgray);
  background-color: var(--color-darkgray);
  color: white;
  font-weight: bold;
  border-radius: 8px;
  margin-left: 8px;
`;

const ChatSend = () => {
  return (
    <ChatSendStyle>
      <ChatInput placeholder="메세지를 입력하세요" />
      <SendButton>전송</SendButton>
    </ChatSendStyle>
  );
};

export default ChatSend;
