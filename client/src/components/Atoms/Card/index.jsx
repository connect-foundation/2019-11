import React from "react";
import PriceContainer from "./PriceContainer";
import {
  CardStyle,
  CardTitle,
  InfoContainer,
  StyledLink,
  BidsStyle,
  TagContainerStyle,
  IsAuctionTag,
  DDayTag,
  ThumbnailStyle
} from "./CardStyles";

import { dateDiff2Dday } from "../../../utils/converter";

import personIcon from "../../../assets/person.svg";

const Card = ({ item }) => {
  const {
    thumbnailUrl,
    isAuction,
    extensionDate,
    title,
    countBids,
    immediatePrice,
    topBid,
    id
  } = item;

  const link = `/products/${id}`;
  return (
    <StyledLink to={link}>
      <CardStyle>
        <Thumbnail thumbnail={thumbnailUrl} />
        <TagContainer isAuction={isAuction} date={extensionDate} />
        <CardTitle>{title}</CardTitle>
        <InfoContainer>
          <Bids bids={countBids} />
          <PriceContainer buyNowPrice={immediatePrice} topBid={topBid} />
        </InfoContainer>
      </CardStyle>
    </StyledLink>
  );
};

const Bids = ({ bids }) => {
  return (
    <BidsStyle>
      <img src={personIcon} />
      {bids}
    </BidsStyle>
  );
};

const TagContainer = ({ isAuction, date }) => {
  const day = dateDiff2Dday(date);

  return (
    <TagContainerStyle>
      {isAuction === true && <IsAuctionTag>경매중</IsAuctionTag>}
      <DDayTag>D - {day}</DDayTag>
    </TagContainerStyle>
  );
};

const Thumbnail = ({ thumbnail }) => {
  return (
    <ThumbnailStyle>
      <img src={thumbnail} />
    </ThumbnailStyle>
  );
};

export default Card;
