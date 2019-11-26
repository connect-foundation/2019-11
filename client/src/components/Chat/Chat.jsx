import React from "react";
import styled from "styled-components";

const ChatStyle = styled.div`
  display: flex;
  padding: var(--padding-md) var(--padding-sm);
`;

const AvatarBox = styled.div``;

const Avatar = styled.img`
  width: 40px;
  height: 40px;
  border-radius: 50%;
`;

const Content = styled.div`
  padding-left: var(--padding-md);
`;

const IdText = styled.div`
  font-weight: bold;
  font-size: 0.9rem;
  color: var(--color-darkgray);
`;

const MessageText = styled.div`
  font-size: 0.8rem;
`;

const Chat = ({ chat }) => {
  return (
    <ChatStyle>
      <AvatarBox>
        <Avatar src={chat.src} />
      </AvatarBox>
      <Content>
        <IdText>{chat.id}</IdText>
        <MessageText>{chat.text}</MessageText>
      </Content>
    </ChatStyle>
  );
};

export default Chat;
