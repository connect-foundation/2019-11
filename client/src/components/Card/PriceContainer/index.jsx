import React from 'react';
import styled from 'styled-components';
import BuyNowPrice from '../BuyNowPrice';
import TopBid from '../TopBid';

const PriceContainerStyle = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  margin-top: 0.5rem;
  flex: 1;
`;

const PriceContainer = (props) => {
  const { buyNowPrice, topBid } = props;
  return(
    <PriceContainerStyle>
      <BuyNowPrice buyNowPrice={buyNowPrice}/>
      <TopBid topBid={topBid}/>
    </PriceContainerStyle>
  )
}

export default PriceContainer;