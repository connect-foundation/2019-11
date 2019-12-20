import React, { useEffect, useContext, useReducer, useState } from "react";
import styled from "styled-components";
import ProductInfo from "../../components/Organism/ProductInfo";
import ChatBox from "../../components/Organism/Chat/ChatBox";
import AuctionGraph from "../../components/Organism/AuctionGraph";
import Spinner from "../../components/Atoms/Spinner";
import { useFetch } from "../../hooks/useFetch";
import pathConfig from "../../config/path";
import UserContext from "../../context/UserContext";
import apiConfig from "../../config/api";
import ProductPageContext from "../../context/ProductPageContext";
import { convert2Price } from "../../utils/converter";
import NotificationContext from "../../context/NotificationContext";
import { getFetch } from "../../services/fetchService";
import SmallCardContainer from "../../components/Molecules/SmallCardContainer";
import ErrorPage from "../../pages/ErrorPage";
import SocketContext from "../../context/SocketContext";

const { apiUrl } = apiConfig;

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

const Section = styled.section`
  min-height: 400px;
  margin-bottom: var(--margin-xl);
  display: flex;
  ${props => (props.center ? "justify-content: center" : undefined)}
`;

const ChatColumn = styled.div`
  width: 400px;
`;

const initialProductPageState = {
  error: null,
  loading: true,
  product: {},
  bids: [],
  chats: []
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
    case "ADD_PURCHASE":
      return {
        ...state,
        product: { ...state.product, ...action.product },
        chats: [...state.chats, action.chat]
      };
    case "ADD_BID":
      return {
        ...state,
        chats: [...state.chats, action.chat],
        bids: [...state.bids, action.bid]
      };
    case "ADD_CHAT":
      return {
        ...state,
        chats: [...state.chats, action.chat]
      };
    case "UPDATE_PRODUCT":
      return { ...state, product: { ...state.product, ...action.product } };
    default:
      throw new Error("NO ACTION TYPE");
  }
};

const DEFAULT_PROFILE_URL =
  "https://kr.object.ncloudstorage.com/palda/img/default-profile-img.jpg";

const ProductPage = ({ match }) => {
  const [user] = useContext(UserContext);
  const { socket } = useContext(SocketContext);
  const [, setNotifications] = useContext(NotificationContext);
  const [productPageState, dispatchProductPage] = useReducer(
    productPageReducer,
    initialProductPageState
  );
  const [relatedItemList, setRelatedItemList] = useState([]);

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
    dispatchProductPage({ type: "FETCH_ERROR", error });
  };

  useFetch(
    `${pathConfig.productsWithBids}/${productId}`,
    handleFetchSuccess,
    handleFetchError
  );

  useEffect(() => {
    if (!socket) return;

    socket.emit("joinRoom", {
      roomId: productId,
      sessionId: socket.id,
      user: user
    });

    socket.on("message", ({ roomId, sender, type, text, createdAt }) => {
      const chat = {
        type,
        sessionId: sender.sessionId,
        id: sender.isSnsLogin ? sender.name : sender.loginId,
        senderId: sender.id,
        src: sender.profileUrl || DEFAULT_PROFILE_URL,
        text,
        key: `M.${createdAt}.${sender.id}`
      };
      return dispatchProductPage({ type: "ADD_CHAT", chat });
    });

    socket.on("bid", ({ roomId, sender, bid, createdAt }) => {
      const chat = {
        type: "bid",
        sessionId: sender.sessionId,
        id: sender.loginId,
        src: sender.profileUrl || DEFAULT_PROFILE_URL,
        text: `${sender.name}님께서 ${convert2Price(
          bid.bidPrice
        )}원에 입찰 하셨습니다.`,
        key: `B.${createdAt}.${sender.id}`
      };

      return dispatchProductPage({ type: "ADD_BID", chat, bid });
    });

    socket.on("purchase", ({ roomId, sender, sold, createdAt }) => {
      const chat = {
        type: "purchase",
        sessionId: sender.sessionId,
        id: sender.loginId,
        src: sender.profileUrl || DEFAULT_PROFILE_URL,
        text: `${sender.name}님이 ${convert2Price(
          sold.soldPrice
        )}원에 즉시 구매하셨습니다.`,
        key: `P.${createdAt}.${sender.id}`
      };

      const product = { soldPrice: sold.soldPrice, soldDate: sold.soldDate };

      return dispatchProductPage({ type: "ADD_PURCHASE", chat, product });
    });

    return () => {
      socket.emit("leaveRoom", {
        roomId: productId,
        sessionId: socket.id,
        user: user
      });
    };
  }, [socket]);

  const getRelatedItemList = async () => {
    if (!productPageState.loading) {
      setRelatedItemList([]);
      const { categoryCode, id } = productPageState.product;
      const url = `${apiUrl}${pathConfig.items.related}/${categoryCode}/${id}`;
      let result = await getFetch(url, {}, {});

      setRelatedItemList(result[0]);
    }
  };

  useEffect(() => {
    getRelatedItemList();
  }, [productPageState.loading]);

  if (productPageState.error) {
    return <ErrorPage />;
  }
  const sellerId = productPageState.product.seller
    ? productPageState.product.seller.id
    : undefined;
  return productPageState.loading ? (
    <Spinner text="상품 준비중" />
  ) : (
    <ProductPageContext.Provider
      value={[productPageState, dispatchProductPage]}
    >
      <ProductPageStyle>
        <MainColumn>
          <Section>
            <ProductInfo />
          </Section>
          {productPageState.product.isAuction ? (
            <Section center>
              <AuctionGraph />
            </Section>
          ) : null}
          <Section>
            <SmallCardContainer
              items={relatedItemList}
              title={"연관상품"}
              isWrap={true}
            />
          </Section>
        </MainColumn>
        <ChatColumn>
          <ChatBox
            productId={productId}
            sellerId={sellerId}
            user={user}
          ></ChatBox>
        </ChatColumn>
      </ProductPageStyle>
    </ProductPageContext.Provider>
  );
};

export default ProductPage;
