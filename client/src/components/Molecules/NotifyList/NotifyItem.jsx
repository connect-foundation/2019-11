import React from "react";
import styled from "styled-components";
import ProductInfo from "../../Organisim/ProductInfo";

const NotifyItemStyle = styled.div`
  width: 300px;
  display: flex;
  flex-direction: column;
  margin-top: 16px;
`;

const NotifyBadge = styled.div`
  width: 52px;
  background: ${props =>
    props.success ? "var(--color-success)" : "var(--color-primary)"};
  padding: var(--padding-sm);
  color: white;
  font-weight: bold;
  text-align: center;
  font-size: 0.7rem;
`;

const NotifyContent = styled.div`
  width: 100%;
  display: flex;
  border: 1px solid var(--color-gray);
  /* border-color: ${props =>
    props.success ? "var(--color-success)" : "var(--color-primary)"}; */
`;

const NotifyLeftContent = styled.div`
  width: 80px;
  height: 80px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const NotifyRightContent = styled.div`
  flex: 1;
  padding: var(--padding-sm);
`;

const NotifyImage = styled.img`
  width: 64px;
  height: 64px;
`;

const NotifyTitle = styled.div`
  font-size: 1rem;
  font-weight: bold;
  color: var(--color-darkgray);
  margin-top: var(--margin-sm);
`;

const NotifyDesc = styled.div`
  font-size: 0.8rem;
  font-weight: bold;
  color: var(--color-darkgray-lighter);
  margin-top: var(--margin-sm);
`;

const AUCTION_TYPE_MAPPER = {
  PURCHASE_SUCCESS: "즉시 구매 성공",
  SALE_SUCCESS: "즉시 판매 성공",
  AUCTION_END_BY_PURCHASE: "다른 유저가 상품 즉시 구매",
  AUCTION_FAIL: "경매 유찰",
  AUCTION_SUCCESS: "경매 낙찰",
  BID_WINNING: "낙찰 성공",
  AUCTION_END_BY_BID: "다른 유저가 상품 낙찰"
};

const isSuccess = type => {
  if (
    type === "PURCHASE_SUCCESS" ||
    type === "SALE_SUCCESS" ||
    type === "AUCTION_SUCCESS" ||
    type === "BID_WINNING"
  ) {
    return true;
  }
  return false;
};

export const NotifyItem = props => {
  const { type, product } = props;
  return (
    <NotifyItemStyle>
      {isSuccess(type) ? (
        <NotifyBadge success>구매 성공</NotifyBadge>
      ) : (
        <NotifyBadge>구매 실패</NotifyBadge>
      )}
      <NotifyContent success>
        <NotifyLeftContent>
          <NotifyImage src="https://picsum.photos/id/170/400/400"></NotifyImage>
        </NotifyLeftContent>
        <NotifyRightContent>
          <NotifyTitle>{product && product.title}</NotifyTitle>
          <NotifyDesc>{type && AUCTION_TYPE_MAPPER(type)}</NotifyDesc>
        </NotifyRightContent>
      </NotifyContent>
    </NotifyItemStyle>
  );
};
