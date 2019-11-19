import React from 'react';
import styled from 'styled-components';
import BuyNowPrice from '../BuyNowPrice';
import TopBid from '../TopBid';

const PriceContainerStyle = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  justify-content: flex-end;
  margin-top: 0.5rem;
  flex: 1;
`;

<<<<<<< HEAD
const PriceContainer = ({buyNowPrice, topBid}) => {
  return(
    <PriceContainerStyle>
      { buyNowPrice === null ? <></> : <BuyNowPrice buyNowPrice={buyNowPrice}/>}
=======
const PriceContainer = (props) => {
  const { buyNowPrice, topBid } = props;
  return(
    <PriceContainerStyle>
      <BuyNowPrice buyNowPrice={buyNowPrice}/>
>>>>>>> 17a98a467404639a4b0a05369bbc66a8cc03fb9f
      <TopBid topBid={topBid}/>
    </PriceContainerStyle>
  )
}

export default PriceContainer;