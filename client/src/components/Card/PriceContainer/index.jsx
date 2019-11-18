import React from "react";
import styled from "styled-components";
import BuyNowPrice from "../BuyNowPrice";
import TopBid from "../TopBid";

const PriceContainerStyle = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  margin-top: 0.5rem;
`;

const PriceContainer = props => {
  return (
    <PriceContainerStyle>
      <BuyNowPrice buyNowPrice={props.buyNowPrice} />
      <TopBid topBid={props.topBid} />
    </PriceContainerStyle>
  );
};

export default PriceContainer;
