import React from "react";
import styled from "styled-components";
import Chat from "./Chat";
import ChatSend from "./ChatSend";

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
    id: "mockData",
    src: "https://i.pravatar.cc/150?img=50",
    text: "만나서 반갑습니다. 이 제품은 제가 가져가도록 하겠습니다."
  },
  {
    id: "masigun",
    src: "https://i.pravatar.cc/150?img=51",
    text:
      "애플 스마트 워치 3세대 제품 예전 부터 갖고 싶었던 제품인데, 제가 구매하겠습니다. 수고하세요"
  },
  {
    id: "chsch1028",
    src: "https://i.pravatar.cc/150?img=1",
    text: "만나서 반갑습니다. 이 제품은 제가 가져가도록 하겠습니다."
  },
  {
    id: "paldaGoalSupan",
    src: "https://i.pravatar.cc/150?img=2",
    text:
      "애플 스마트 워치 3세대 제품 예전 부터 갖고 싶었던 제품인데, 제가 구매하겠습니다. 수고하세요"
  },
  {
    id: "JesseJacobs",
    src: "https://i.pravatar.cc/150?img=3",
    text: "경매 고고"
  },
  {
    id: "chsch1028",
    src: "https://i.pravatar.cc/150?img=4",
    text: "음..........아ㅏ.....오....에...이...우...."
  },
  {
    id: "BrianBanks",
    src: "https://i.pravatar.cc/150?img=5",
    text: "40,000원에 사면 손해 일까요????"
  },
  {
    id: "SeoJunBae",
    src: "https://i.pravatar.cc/150?img=6",
    text: "저는 데이터 베이스 디자인을 하고 있습니다. 너무 어렵고 힘듭니다."
  },
  {
    id: "HwangSeonJun",
    src: "https://i.pravatar.cc/150?img=7",
    text: "공유 버튼 관련해서 고민되는 내용이 있네요."
  },
  {
    id: "HongSeongPyo",
    src: "https://i.pravatar.cc/150?img=8",
    text: "오늘은 월요일이라 피곤하네요."
  },
  {
    id: "baegopa",
    src: "https://i.pravatar.cc/150?img=9",
    text: "오늘 한끼 두끼 떡볶이를 먹었습니다. 내일은 뭐 먹을까요??"
  },
  {
    id: "JJajangMyeon",
    src: "https://i.pravatar.cc/150?img=10",
    text: "화요일은 짜장면을 먹어보면 어떨까요?? 맛있겠다."
  }
];

const ChatBox = () => {
  return (
    <ChatBoxStyle>
      <ChatHeader>
        <TitleText>채팅</TitleText>
      </ChatHeader>
      <ChatBody>
        {chatList.map(chat => {
          return <Chat chat={chat}></Chat>;
        })}
        <ChatAlert>
          <ChatAlertWithBid>
            hwangSJ 님이 50,000원에 입찰하셨습니다.
          </ChatAlertWithBid>
        </ChatAlert>
        {chatList.slice(0, 2).map(chat => {
          return <Chat chat={chat}></Chat>;
        })}
      </ChatBody>
      <ChatFooter>
        <ChatSend />
      </ChatFooter>
    </ChatBoxStyle>
  );
};

export default ChatBox;
