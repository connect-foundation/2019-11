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
`;

const PriceContainer = ({buyNowPrice, topBid}) => {
  return(
    <PriceContainerStyle>
      { buyNowPrice === null ? <></> : <BuyNowPrice buyNowPrice={buyNowPrice}/>}
      <TopBid topBid={topBid}/>
    </PriceContainerStyle>
  )
}

export default PriceContainer;