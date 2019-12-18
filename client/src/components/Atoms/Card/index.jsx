import React from "react";
import styled, { css } from "styled-components";
import { Link } from "react-router-dom";

import { convert2Price } from "../../../utils/converter";

import personIcon from "../../../assets/person.svg";
import { getDiffDateTime } from "../../../utils/dateUtil";

const CardStyle = styled.div`
  display: flex;
  flex-direction: column;
  border-radius: 1rem;
  margin: 1rem;
  background: white;
  width: 13rem;
  height: 17rem;
  padding: 0;
  cursor: pointer;
  box-shadow: 0 0.1rem 0.4rem 0 rgba(0, 0, 0, 0.2), 0 0.3rem 0.2rem 0 rgba(0, 0, 0, 0.19);
  transition: all 0.15s ease-in-out;
  &:hover {
    transform: scale(1.05);
  }
`;

const CardTitle = styled.span`
  display: inline-block;
  font-size: x-large;
  text-align: center;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  padding-left: 0.2em;
  padding-right: 0.2em;
`;

const InfoContainer = styled.div`
  display: flex;
  justify-content: space-around;
  flex: 1;
  padding: 0 1rem 1rem 1rem;
`;

const StyledLink = styled(Link)`
  height: fit-content;
  text-decoration: none;
  color: black;
`;

const BidsStyle = styled.div`
  display: flex;
  align-items: flex-end;
  img {
    width: 0.8rem;
    height: 0.8rem;
    margin-right: 0.1rem;
  }
  font-size: small;
`;

const TagContainerStyle = styled.div`
  display: flex;
  font-size: x-small;
  padding: 0.1rem;
`;

const TagCommonCss = css`
  border-radius: 0.5rem;
  padding: 0.1rem 0.3rem 0.1rem 0.3rem;
  margin: 0.25rem;
`;

const IsAuctionTag = styled.div`
  ${TagCommonCss}
  border: var(--color-primary) solid 0.1rem;
  color: var(--color-primary);
`;

const DDayTag = styled.div`
  ${TagCommonCss}
  border: var(--color-secondary) solid 0.1rem;
  color: var(--color-secondary);
`;

const IsSaleTag = styled.div`
  ${TagCommonCss}
  border: var(--color-on-sale) solid 0.1rem;
  color: var(--color-on-sale);
`;

const ThumbnailStyle = styled.div`
  display: flex;
  height: 10rem;
  border-radius: 1rem 1rem 0 0;
  overflow: hidden;
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;

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
  color: var(--color-tertiary);
  label {
    color: black;
    margin-right: 0.5rem;
  }
`;

const TopBidStyle = styled.div`
  display: flex;
  height: 1rem;
  font-size: small;
  color: var(--color-secondary);
  label {
    color: black;
    margin-right: 0.5rem;
  }
`;

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
        <CardTitle>
          <label>{title}</label>
        </CardTitle>
        <InfoContainer>
          {isAuction && <Bids bids={countBids} />}
          <PriceContainer buyNowPrice={immediatePrice} topBid={topBid} isAuction={isAuction} />
        </InfoContainer>
      </CardStyle>
    </StyledLink>
  );
};

const Bids = ({ bids }) => {
  return (
    <BidsStyle>
      <img src={personIcon} alt={"profile Image"} />
      {bids}
    </BidsStyle>
  );
};

const TagContainer = ({ isAuction, date }) => {
  const { d } = getDiffDateTime(date);

  return (
    <TagContainerStyle>
      {isAuction && <IsAuctionTag>경매중</IsAuctionTag>}
      {!isAuction && <IsSaleTag>판매중</IsSaleTag>}
      <DDayTag>D - {d === 0 ? "day" : d}</DDayTag>
    </TagContainerStyle>
  );
};

const Thumbnail = ({ thumbnail }) => {
  return (
    <ThumbnailStyle>
      <img src={thumbnail} alt={"thumbnail"} />
    </ThumbnailStyle>
  );
};
const PriceContainer = ({ buyNowPrice, topBid, isAuction }) => {
  return (
    <PriceContainerStyle>
      <BuyNowPrice buyNowPrice={buyNowPrice} />
      {isAuction && <TopBid topBid={topBid} />}
    </PriceContainerStyle>
  );
};

const BuyNowPrice = ({ buyNowPrice }) => {
  return (
    <BuyNowPriceStyle>
      <label>즉시 구매가</label>
      {convert2Price(buyNowPrice)}
    </BuyNowPriceStyle>
  );
};

const TopBid = ({ topBid }) => {
  return (
    <TopBidStyle>
      <label>현재 입찰가</label>
      {convert2Price(topBid)}
    </TopBidStyle>
  );
};

export default Card;
