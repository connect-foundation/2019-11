import React from 'react';
import styled from 'styled-components';
import Thumbnail from './Thumbnail';
import TagContainer from './TagContainer';
import CardTitle from './CardTitle';
import Bids from './Bids';
import PriceContainer from './PriceContainer'

const CardStyle = styled.div`
  border-radius: 1rem;
  margin: 1rem;
  background: white;
  width: 13rem;
  height: 17rem;
  padding: 0;
  cursor: pointer;
  box-shadow: 0 0.1rem 0.4rem 0 rgba(0, 0, 0, 0.2), 0 0.3rem 0.2rem 0 rgba(0, 0, 0, 0.19);
  transition: all .15s ease-in-out;
  &:hover {
    transform: scale(1.05);
  }
`;

const InfoContainer = styled.div`
  display: flex;
  justify-content: space-around;
`;

const Card = ({item}) => {
  const { thumbnail,
          isAuction,
          date,
          title,
          bids,
          buyNowPrice,
          topBid } = item

  return (
    <CardStyle>
      <Thumbnail thumbnail={thumbnail}/>
      <TagContainer isAuction={isAuction} date={date}/>
      <CardTitle>{title}</CardTitle>
      <InfoContainer>
        <Bids bids={bids}/>
        <PriceContainer buyNowPrice={buyNowPrice} topBid={topBid}/>
      </InfoContainer>
    </CardStyle>
  )
}

export default Card;