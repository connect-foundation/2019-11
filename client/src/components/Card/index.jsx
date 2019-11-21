import React from "react";
import Thumbnail from "./Thumbnail";
import TagContainer from "./TagContainer";
import Bids from "./Bids";
import PriceContainer from "./PriceContainer";
import { CardStyle, CardTitle, InfoContainer, StyledLink } from "./CardStyles";

const Card = ({ item }) => {
  const { thumbnail, isAuction, date, title, bids, buyNowPrice, topBid, id } = item;
  const link = `/products/${id}`;
  return (
    <StyledLink to={link}>
      <CardStyle>
        <Thumbnail thumbnail={thumbnail} />
        <TagContainer isAuction={isAuction} date={date} />
        <CardTitle>{title}</CardTitle>
        <InfoContainer>
          <Bids bids={bids} />
          <PriceContainer buyNowPrice={buyNowPrice} topBid={topBid} />
        </InfoContainer>
      </CardStyle>
    </StyledLink>
  );
};

export default Card;
