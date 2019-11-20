import React, { useEffect, useState, useRef } from "react";
import styled from "styled-components";
import Chat from "./Chat";
import ChatSend from "./ChatSend";
import io from "socket.io-client";

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

const chatList = [
  {
    type: "message",
    id: "mockData",
    src: "https://i.pravatar.cc/150?img=50",
    text: "만나서 반갑습니다. 이 제품은 제가 가져가도록 하겠습니다."
  },
  {
    type: "message",
    id: "masigun",
    src: "https://i.pravatar.cc/150?img=51",
    text:
      "애플 스마트 워치 3세대 제품 예전 부터 갖고 싶었던 제품인데, 제가 구매하겠습니다. 수고하세요"
  },
  {
    type: "message",
    id: "chsch1028",
    src: "https://i.pravatar.cc/150?img=1",
    text: "만나서 반갑습니다. 이 제품은 제가 가져가도록 하겠습니다."
  },
  {
    type: "message",
    id: "paldaGoalSupan",
    src: "https://i.pravatar.cc/150?img=2",
    text:
      "애플 스마트 워치 3세대 제품 예전 부터 갖고 싶었던 제품인데, 제가 구매하겠습니다. 수고하세요"
  },
  {
    type: "message",
    id: "JesseJacobs",
    src: "https://i.pravatar.cc/150?img=3",
    text: "경매 고고"
  },
  {
    type: "message",
    id: "chsch1028",
    src: "https://i.pravatar.cc/150?img=4",
    text: "음..........아ㅏ.....오....에...이...우...."
  },
  {
    type: "message",
    id: "BrianBanks",
    src: "https://i.pravatar.cc/150?img=5",
    text: "40,000원에 사면 손해 일까요????"
  },
  {
    type: "alert",
    text: "hwangSJ님께서 50,000원에 구매하셨습니다."
  },
  {
    type: "message",
    id: "SeoJunBae",
    src: "https://i.pravatar.cc/150?img=6",
    text: "저는 데이터 베이스 디자인을 하고 있습니다. 너무 어렵고 힘듭니다."
  },
  {
    type: "message",
    id: "HwangSeonJun",
    src: "https://i.pravatar.cc/150?img=7",
    text: "공유 버튼 관련해서 고민되는 내용이 있네요."
  },
  {
    type: "message",
    id: "HongSeongPyo",
    src: "https://i.pravatar.cc/150?img=8",
    text: "오늘은 월요일이라 피곤하네요."
  },
  {
    type: "message",
    id: "baegopa",
    src: "https://i.pravatar.cc/150?img=9",
    text: "오늘 한끼 두끼 떡볶이를 먹었습니다. 내일은 뭐 먹을까요??"
  },
  {
    type: "message",
    id: "JJajangMyeon",
    src: "https://i.pravatar.cc/150?img=10",
    text: "화요일은 짜장면을 먹어보면 어떨까요?? 맛있겠다."
  }
];

//TODO: 입찰가격에 대한 정보를 표시해주기 위해서는 socket 연결부분이 상위 컴포넌트로 이동되야 할듯!
//아니면, contextAPI를 통해서 해당 입찰 정보값을 확인해도 될 듯
const ChatBox = ({ productId, user }) => {
  const [chats, setChats] = useState(chatList);
  const [message, setMessage] = useState("");
  const [socketClient, setSocketClient] = useState("");

  const chatBodyRef = useRef();

  useEffect(() => {
    chatBodyRef.current.scrollTo(0, chatBodyRef.current.scrollHeight);
  });

  useEffect(() => {
    const socket = io("localhost:4000");
    socket.on("connect", () => {
      setSocketClient(socket);
      // console.log(socket.id);
      // console.dir(socket);
      socket.emit("joinRoom", {
        roomId: productId,
        sessionId: socket.id,
        userId: user.id
      });
    });

    socket.on("message", ({ sessionId, userId, text }) => {
      setChats(chats => [
        ...chats,
        {
          type: "message",
          id: sessionId,
          src: "https://i.pravatar.cc/150?img=10",
          text
        }
      ]);
    });

    socket.on("joinRoom", message => {
      console.log(message);
    });

    socket.on("disconnect", reason => {
      console.log(reason);
    });
  }, []);

  const onSubmit = e => {
    e.preventDefault();
    socketClient.emit("message", {
      roomId: productId,
      sessionId: socketClient.id,
      userId: user.id,
      text: message
    });

    setMessage("");
    console.log(message);
  };

  const onChange = e => {
    setMessage(e.target.value);
  };

  return (
    <ChatBoxStyle>
      <ChatHeader>
        <TitleText>채팅</TitleText>
      </ChatHeader>
      <ChatBody ref={chatBodyRef}>
        {chats.map((chat, idx) => {
          return chat.type === "message" ? (
            <Chat key={idx} chat={chat} />
          ) : (
            <ChatAlert key={idx}>
              <ChatAlertWithBid>{chat.text}</ChatAlertWithBid>
            </ChatAlert>
          );
        })}
      </ChatBody>
      <ChatFooter>
        <ChatSend message={message} onSubmit={onSubmit} onChange={onChange} />
      </ChatFooter>
    </ChatBoxStyle>
  );
};

export default ChatBox;
