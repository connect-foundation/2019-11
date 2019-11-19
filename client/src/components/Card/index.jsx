import React from "react";
import Thumbnail from "./Thumbnail";
import TagContainer from "./TagContainer";
import Bids from "./Bids";
import PriceContainer from "./PriceContainer";
import { CardStyle, CardTitle, InfoContainer } from "./CardStyles";
import styled from "styled-components";

const Card = ({ item }) => {
  const { thumbnail, isAuction, date, title, bids, buyNowPrice, topBid } = item;

  const InfoContainer = styled.div`
    display: flex;
    justify-content: space-around;
  `;

  return (
    <CardStyle>
      <Thumbnail thumbnail={thumbnail} />
      <TagContainer isAuction={isAuction} date={date} />
      <CardTitle>{title}</CardTitle>
      <InfoContainer>
        <Bids bids={bids} />
        <PriceContainer buyNowPrice={buyNowPrice} topBid={topBid} />
      </InfoContainer>
    </CardStyle>
  );
};

export default Card;
