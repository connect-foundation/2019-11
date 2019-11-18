import React from 'react';
import Thumbnail from './Thumbnail';
import TagContainer from './TagContainer';
import Bids from './Bids';
import PriceContainer from './PriceContainer'
import { CardStyle, CardTitle, InfoContainer } from './CardStyles';

const Card = ({item}) => {
  const { thumbnail,
          isAuction,
          date,
          title,
          bids,
          buyNowPrice,
          topBid } = item

<<<<<<< HEAD
=======
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

>>>>>>> 17a98a467404639a4b0a05369bbc66a8cc03fb9f
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