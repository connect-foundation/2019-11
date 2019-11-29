import React from "react";
import styled from "styled-components";

const PriceContainerStyle = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  justify-content: flex-end;
  margin-top: 0.5rem;
  flex: 1;
`;

const BuyNowPriceStyle = styled.div`
  display: flex;
  height: 1rem;
  font-size: small;
  color: #beddbf;
  label {
    color: black;
    margin-right: 0.5rem;
  }
`;

const TopBidStyle = styled.div`
  display: flex;
  height: 1rem;
  font-size: middle;
  color: #feaa6e;
  label {
    color: black;
    margin-right: 0.5rem;
  }
`;

const PriceContainer = props => {
  const { buyNowPrice, topBid } = props;
  return (
    <PriceContainerStyle>
      {buyNowPrice === null ? <></> : <BuyNowPrice buyNowPrice={buyNowPrice} />}
      <TopBid topBid={topBid} />
    </PriceContainerStyle>
  );
};

const BuyNowPrice = ({ buyNowPrice }) => {
  return (
    <BuyNowPriceStyle>
      <label>즉시 구매가</label>
      {buyNowPrice}
    </BuyNowPriceStyle>
  );
};

const TopBid = ({ topBid }) => {
  return (
    <TopBidStyle>
      <label>현재 입찰가</label>
      {topBid}
    </TopBidStyle>
  );
};

export default PriceContainer;
