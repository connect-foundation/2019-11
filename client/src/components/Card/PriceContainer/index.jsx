import React from 'react';
import styled from 'styled-components';
import BuyNowPrice from '../BuyNowPrice';
import TopBid from '../TopBid';

const PriceContainer = (props) => {
  return(
    <>
      <BuyNowPrice buyNowPrice={props.buyNowPrice}/>
      <TopBid topBid={props.topBid}/>
    </>
  )
}

export default PriceContainer;