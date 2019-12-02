import React from "react"
import PriceContainer from "./PriceContainer"
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
} from "./CardStyles"

import { getDDay } from "../../../utils/stringUtils"

import personIcon from "../../../assets/person.svg"

const Card = ({ item }) => {
  const { thumbnail, isAuction, date, title, bids, buyNowPrice, topBid, id } = item

  const link = `/products/${id}`

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
  )
}

const Bids = ({ bids }) => {
  return (
    <BidsStyle>
      <img src={personIcon} />
      {bids}
    </BidsStyle>
  )
}

const TagContainer = ({ isAuction, date }) => {
  const day = getDDay(date)

  return (
    <TagContainerStyle>
      {isAuction === true && <IsAuctionTag>경매중</IsAuctionTag>}
      <DDayTag>D - {day}</DDayTag>
    </TagContainerStyle>
  )
}

const Thumbnail = ({ thumbnail }) => {
  return (
    <ThumbnailStyle>
      <img src={thumbnail} />
    </ThumbnailStyle>
  )
}

export default Card
