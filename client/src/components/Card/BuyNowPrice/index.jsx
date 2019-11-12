import React from 'react';
import styled from 'styled-components';

const BuyNowPriceStyle = styled.div``;

const BuyNowPrice = (props) => {
  return (
    <BuyNowPriceStyle>
      {props.buyNowPrice}
    </BuyNowPriceStyle>
  )
}

export default BuyNowPrice;