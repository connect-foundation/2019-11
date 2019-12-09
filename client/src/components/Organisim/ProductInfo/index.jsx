import React, { useState, useEffect, useContext } from "react";
import styled from "styled-components";
import ShareCollection from "../../Product/ShareCollection";
import { convert2Price } from "../../../utils/converter";
import axios from "axios";
import apiConfig from "../../../config/api";
import pathConfig from "../../../config/path";
import moment from "moment";
import ModalContext from "../../../context/ModalContext";
import FailModal from "../../Molecules/CustomModal/FailModal";
import SuccessModal from "../../Molecules/CustomModal/SuccessModal";
import UserContext from "../../../context/UserContext";
import ShareBox from "../../Molecules/ShareBox";
import TextTimer from "../../Atoms/TextTimer";
import ProductPageContext from "../../../context/ProductPageContext";
import { getDiffDateTime } from "../../../utils/dateUtil";

const { apiUrl } = apiConfig;

const ProductInfoStyle = styled.div`
  display: flex;
  min-height: 400px;
  margin: 0 auto;
  justify-content: center;
`;

const ProductImageBox = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: center;
`;

const ProductImage = styled.img`
  width: 400px;
  height: 400px;
  border: 1px solid var(--color-gray);
  border-radius: 8px;
  padding: var(--padding-xs);
`;

const ProductDescBox = styled.div`
  width: 480px;
  padding-top: var(--padding-lg);
  padding-right: var(--padding-md);
`;

const ProductDescText = styled.span`
  color: ${props => (props.primary ? "var(--color-primary)" : "black")};
  font-weight: ${props => (props.bold ? "bold" : "normal")};
  font-size: ${props => (props.size === "sm" ? "0.8rem" : "1.1rem")};
  margin-left: var(--margin-sm);
`;

const ProductTitle = styled.div`
  margin-bottom: var(--margin-xl);
  font-size: 1.4rem;
  font-weight: bold;
  padding-left: var(--padding-lg);
  color: var(--color-darkgray);
`;

const ProductSeller = styled.div`
  text-align: right;
`;

const ProductDueDate = styled.div`
  margin: var(--margin-md) 0px;
  text-align: right;
`;

const ProductBid = styled.form`
  margin: var(--margin-md) 0px;
  text-align: right;
`;

const BidInput = styled.input`
  border: 1px solid var(--color-gray);
  border-right: none;
  padding: var(--padding-md);
  font-size: 0.8rem;
  min-width: 200px;
  ${ProductBid}:hover & {
    border-color: var(--color-darkgray-lighter);
  }
`;

const BidButton = styled.button`
  border: 1px solid black;
  padding: var(--padding-md);
  background-color: black;
  color: white;
  font-size: 0.8rem;
  font-weight: bold;
`;

const ProductPurchase = styled(ProductBid)`
  margin-bottom: var(--margin-xl);
`;

const PurchasePrice = styled.span`
  border: 1px solid var(--color-gray);
  display: inline-block;
  border-right: none;
  padding: var(--padding-md);
  font-size: 0.8rem;
  min-width: 200px;
  text-align: left;

  ${ProductPurchase}:hover & {
    border-color: var(--color-primary);
  }
`;

const PurchaseButton = styled(BidButton)`
  background-color: var(--color-primary);
  border-color: var(--color-primary);
`;

const ProductInfo = () => {
  const [user, setUser] = useContext(UserContext);
  const [productPageState, dispatchProductPage] = useContext(
    ProductPageContext
  );

  const { socketClient, product } = productPageState;
  const [modal, setModal] = useContext(ModalContext);

  /*   
  'dispatchProductPage' 
  'buyerId' 
  'categoryCode' 
  'contents' 
  'startBidPrice' 
  'hopePrice' 
  'images' 
  'soldPrice' 
  'soldDate' 
  'registerDate' 
  'extensionDate' 
  'modal',
  */

  const {
    id,
    title,
    immediatePrice,
    thumbnailUrl,
    isAuction,
    auctionDeadline,
    seller
  } = product;

  const { diff, d, h, m, s } = getDiffDateTime(auctionDeadline);
  const [deadLine, setDeadLine] = useState(
    diff > 0 ? `D-${d} ${h}:${m}:${s}` : "경매 마감"
  );

  const baseURL = apiUrl;

  const handleBidSubmit = e => {
    e.preventDefault();

    if (Object.keys(user).length === 0) {
      return setModal({
        isOpen: true,
        component: FailModal,
        message: "로그인이 필요합니다."
      });
    }

    const params = {
      bidPrice: e.target.bidPrice.value,
      bidDate: moment().format("YYYY-MM-DD h:mm:ss"),
      userId: user.id,
      productId: id
    };

    axios
      .post(`${baseURL}${pathConfig.bids}`, params)
      .then(response => {
        if (response.status < 300) {
          socketClient.emit("bid", {
            type: "alert",
            roomId: id,
            sender: { ...user, sessionId: user.sessionId },
            bid: response.data,
            createdAt: Date.now()
          });

          setModal({
            isOpen: true,
            component: SuccessModal,
            message: "입찰 성공"
          });
        }
      })
      .catch(e => {
        setModal({ isOpen: true, component: FailModal, message: "입찰 실패" });
      });
  };

  const handleImmediateSubmit = price => e => {
    e.preventDefault();

    if (Object.keys(user).length === 0) {
      return setModal({
        isOpen: true,
        component: FailModal,
        message: "로그인이 필요합니다."
      });
    }

    const params = {
      soldPrice: price,
      soldDate: moment().format("YYYY-MM-DD h:mm:ss"),
      buyerId: user.id
    };

    axios
      .patch(`${baseURL}${pathConfig.products}/${id}`, params)
      .then(response => {
        socketClient.emit("purchase", {
          roomId: id,
          sender: { ...user, sessionId: socketClient.id },
          sold: response.data,
          createdAt: Date.now()
        });

        setModal({
          isOpen: true,
          component: SuccessModal,
          message: "즉시 구매 성공"
        });
      })
      .catch(() => {
        setModal({
          isOpen: true,
          component: FailModal,
          message: "즉시 구매 실패"
        });
      });
  };

  return (
    <ProductInfoStyle>
      <ProductImageBox>
        <ProductImage src={thumbnailUrl} />
      </ProductImageBox>

      <ProductDescBox>
        <ProductTitle>{title}</ProductTitle>
        <ProductSeller>
          <ProductDescText size="sm">판매자</ProductDescText>
          <ProductDescText primary bold>
            {seller.name}
          </ProductDescText>
        </ProductSeller>
        <ProductDueDate>
          <ProductDescText size="sm">판매 종료일</ProductDescText>
          <ProductDescText primary bold>
            {auctionDeadline
              ? moment(auctionDeadline).format("YYYY년 MM월 DD일")
              : "비경매 상품"}
          </ProductDescText>
        </ProductDueDate>

        {isAuction ? (
          <ProductDueDate>
            <ProductDescText size="sm">남은 시간</ProductDescText>
            <ProductDescText primary bold>
              {<TextTimer auctionDeadline={auctionDeadline} /> || "비경매 상품"}
            </ProductDescText>
          </ProductDueDate>
        ) : null}

        <ProductBid onSubmit={handleBidSubmit}>
          <BidInput name="bidPrice" placeholder="입찰 가격" />
          <BidButton>입찰</BidButton>
        </ProductBid>

        <ProductPurchase onSubmit={handleImmediateSubmit(immediatePrice)}>
          <PurchasePrice>
            즉시 구매가
            <ProductDescText primary bold size="sm">
              {`${convert2Price(immediatePrice)} 원`}
            </ProductDescText>
          </PurchasePrice>
          <PurchaseButton>구매</PurchaseButton>
        </ProductPurchase>

        {/* <ShareBox></ShareBox> */}
        <ShareCollection></ShareCollection>
      </ProductDescBox>
    </ProductInfoStyle>
  );
};

export default ProductInfo;
