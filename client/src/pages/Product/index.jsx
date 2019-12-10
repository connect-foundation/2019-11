import React, { useState, useEffect, useContext, useReducer } from "react";
import styled from "styled-components";
import ProductInfo from "../../components/Organisim/ProductInfo";
import ChatBox from "../../components/Organisim/Chat/ChatBox";
import AuctionGraph from "../../components/Organisim/AuctionGraph";
import Spinner from "../../components/Atoms/Spinner";
import { useFetch } from "../../hooks/useFetch";
import pathConfig from "../../config/path";
import UserContext from "../../context/UserContext";
import apiConfig from "../../config/api";
import io from "socket.io-client";
import ProductPageContext from "../../context/ProductPageContext";
import { convert2Price } from "../../utils/converter";

const { chatUrl } = apiConfig;

const ProductPageStyle = styled.div`
  display: flex;
  margin: 0 auto;
  width: 100%;
  max-width: 1440px;
  padding: var(--padding-md);
`;

const MainColumn = styled.div`
  flex: 1;
  overflow-x: auto;
  overflow-x: hidden;
`;

const TextStyle = styled.p`
  font-size: ${props => props.size};
`;

const Section = styled.section`
  min-height: 400px;
  margin-bottom: var(--margin-xl);
  display: flex;
  ${props => (props.center ? "justify-content: center" : undefined)}
`;

const ChatColumn = styled.div`
  width: 400px;
`;

const Loading = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  border: 1px solid red;
`;

const chatList = [
  {
    type: "message",
    id: "mockData",
    src: "https://i.pravatar.cc/150?img=50",
    text: "만나서 반갑습니다. 이 제품은 제가 가져가도록 하겠습니다.",
    key: "1"
  },
  {
    type: "message",
    id: "masigun",
    src: "https://i.pravatar.cc/150?img=51",
    text:
      "애플 스마트 워치 3세대 제품 예전 부터 갖고 싶었던 제품인데, 제가 구매하겠습니다. 수고하세요",
    key: "2"
  },
  {
    type: "message",
    id: "chsch1028",
    src: "https://i.pravatar.cc/150?img=1",
    text: "만나서 반갑습니다. 이 제품은 제가 가져가도록 하겠습니다.",
    key: "3"
  },
  {
    type: "message",
    id: "paldaGoalSupan",
    src: "https://i.pravatar.cc/150?img=2",
    text:
      "애플 스마트 워치 3세대 제품 예전 부터 갖고 싶었던 제품인데, 제가 구매하겠습니다. 수고하세요",
    key: "4"
  },
  {
    type: "message",
    id: "JesseJacobs",
    src: "https://i.pravatar.cc/150?img=3",
    text: "경매 고고",
    key: "5"
  },
  {
    type: "message",
    id: "chsch1028",
    src: "https://i.pravatar.cc/150?img=4",
    text: "음..........아ㅏ.....오....에...이...우....",
    key: "6"
  },
  {
    type: "message",
    id: "BrianBanks",
    src: "https://i.pravatar.cc/150?img=5",
    text: "40,000원에 사면 손해 일까요????",
    key: "7"
  },
  {
    type: "alert",
    text: "hwangSJ님께서 50,000원에 구매하셨습니다.",
    key: "8"
  },
  {
    type: "message",
    id: "SeoJunBae",
    src: "https://i.pravatar.cc/150?img=6",
    text: "저는 데이터 베이스 디자인을 하고 있습니다. 너무 어렵고 힘듭니다.",
    key: "9"
  },
  {
    type: "message",
    id: "HwangSeonJun",
    src: "https://i.pravatar.cc/150?img=7",
    text: "공유 버튼 관련해서 고민되는 내용이 있네요.",
    key: "10"
  },
  {
    type: "message",
    id: "HongSeongPyo",
    src: "https://i.pravatar.cc/150?img=8",
    text: "오늘은 월요일이라 피곤하네요.",
    key: "11"
  },
  {
    type: "message",
    id: "baegopa",
    src: "https://i.pravatar.cc/150?img=9",
    text: "오늘 한끼 두끼 떡볶이를 먹었습니다. 내일은 뭐 먹을까요??",
    key: "12"
  },
  {
    type: "message",
    id: "JJajangMyeon",
    src: "https://i.pravatar.cc/150?img=10",
    text: "화요일은 짜장면을 먹어보면 어떨까요?? 맛있겠다.",
    key: "13"
  }
];

const initialProductPageState = {
  error: null,
  loading: true,
  product: {},
  bids: [],
  chats: [],
  socketClient: null
};

const productPageReducer = (state, action) => {
  switch (action.type) {
    case "FETCH_SUCCESS":
      return {
        ...state,
        product: action.product,
        bids: action.bids,
        loading: action.loading
      };
    case "FETCH_ERROR":
      return { ...state, error: action.error };
    case "ADD_CHAT":
      return { ...state, chats: [...state.chats, action.chat] };
    case "ADD_BID":
      return {
        ...state,
        chats: [...state.chats, action.chat],
        bids: [...state.bids, action.bid]
      };
    case "SET_SOCKET":
      return { ...state, socketClient: action.socket };
    default:
      throw new Error("NO ACTION TYPE");
  }
};

const DEFAULT_PROFILE_URL =
  "https://kr.object.ncloudstorage.com/palda/img/default-profile-img.jpg";

const ProductPage = ({ match }) => {
  const [productPageState, dispatchProductPage] = useReducer(
    productPageReducer,
    initialProductPageState
  );

  const [user, setUser] = useContext(UserContext);

  const productId = match.params.id;

  const handleFetchSuccess = response => {
    dispatchProductPage({
      type: "FETCH_SUCCESS",
      product: response.data,
      bids: response.data.bids,
      loading: false
    });
  };

  const handleFetchError = error => {
    dispatchProductPage({ tpye: "FETCH_ERROR", error });
  };

  useFetch(
    `${pathConfig.products}/${productId}`,
    handleFetchSuccess,
    handleFetchError
  );

  useEffect(() => {
    const socket = io(chatUrl);
    socket.on("connect", () => {
      dispatchProductPage({ type: "SET_SOCKET", socket });

      socket.emit("joinRoom", {
        roomId: productId,
        sessionId: socket.id,
        userId: user.loginId
      });
    });

    socket.on("message", ({ roomId, sender, type, text, createdAt }) => {
      const chat = {
        type,
        sessionId: sender.sessionId,
        id: sender.loginId,
        src: sender.profileUrl || DEFAULT_PROFILE_URL,
        text,
        key: `${createdAt}.${sender.id}`
      };
      return dispatchProductPage({ type: "ADD_CHAT", chat });
    });

    socket.on("bid", ({ roomId, sender, bid, createdAt }) => {
      const chat = {
        type: "alert",
        sessionId: sender.sessionId,
        id: sender.loginId,
        src: sender.profileUrl || DEFAULT_PROFILE_URL,
        text: `${sender.name}님께서 ${convert2Price(
          bid.bidPrice
        )}원에 입찰 하셨습니다.`,
        key: `${createdAt}.${sender.id}`
      };

      return dispatchProductPage({ type: "ADD_BID", chat, bid });
    });

    socket.on("purchase", ({ roomId, sender, sold, createdAt }) => {
      const chat = {
        type: "alert",
        sessionId: sender.sessionId,
        id: sender.loginId,
        src: sender.profileUrl || DEFAULT_PROFILE_URL,
        text: `${sender.name}님이 ${convert2Price(
          sold.soldPrice
        )}원에 즉시 구매하셨습니다.`,
        key: `${createdAt}.${sender.id}`
      };

      return dispatchProductPage({ type: "ADD_CHAT", chat });
    });

    socket.on("joinRoom", message => {
      // console.log(message);
    });

    socket.on("disconnect", reason => {
      // console.log(reason);
    });
  }, [chatUrl, dispatchProductPage]);

  return productPageState.loading ? (
    <Spinner />
  ) : (
    <ProductPageContext.Provider
      value={[productPageState, dispatchProductPage]}
    >
      <ProductPageStyle>
        <MainColumn>
          <Section>
            <ProductInfo />
          </Section>
          <Section center>
            <AuctionGraph />
          </Section>
        </MainColumn>
        <ChatColumn>
          <ChatBox productId={productId} user={user}></ChatBox>
        </ChatColumn>
      </ProductPageStyle>
    </ProductPageContext.Provider>
  );
};

export default ProductPage;
