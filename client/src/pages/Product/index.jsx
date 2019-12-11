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
    `${pathConfig.productsWithBids}/${productId}`,
    handleFetchSuccess,
    handleFetchError
  );

  useEffect(() => {
    if (Object.keys(user).length === 0) return;
    const socket = io(chatUrl);
    socket.on("connect", () => {
      dispatchProductPage({ type: "SET_SOCKET", socket });
      console.log(user);
      socket.emit("joinRoom", {
        roomId: productId,
        sessionId: socket.id,
        user: user
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

    socket.on("private", ({ data }) => {
      console.log("private data:::" + data);
    });

    socket.on("joinRoom", message => {
      // console.log(message);
    });

    socket.on("disconnect", reason => {
      // console.log(reason);
    });
  }, [user, chatUrl, dispatchProductPage]);

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
