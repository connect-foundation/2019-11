import React from 'react';
import styled from 'styled-components';
import Thumbnail from './Thumbnail';
import TagContainer from './TagContainer';
import CardTitle from './CardTitle';
import Bids from './Bids';
import PriceContainer from './PriceContainer'

const CardStyle = styled.div`
  border-radius: 1rem;
  margin: 0.1rem;
  background: white;
  height: 15rem;
  border: solid 0.1rem #FEAA6E
`;

const InfoContainer = styled.div`
  display: flex;
  justify-content: space-around;
`;

const Card = (props) => {
  return (
    <CardStyle>
      <Thumbnail thumbnail={props.item.thumbnail}/>
      <TagContainer isAuction={props.item.isAuction} date={props.item.date}/>
      <CardTitle title={props.item.title}/>
      <InfoContainer>
        <Bids bids={props.item.bids}/>
        <PriceContainer buyNowPrice={props.item.buyNowPrice} topBid={props.item.topBid}/>
      </InfoContainer>
    </CardStyle>
  )
}

export default Card;