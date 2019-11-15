import React from 'react';
import styled from 'styled-components';

const BuyNowPriceStyle = styled.div`
  display: flex;
  height: 1rem;
  font-size: small;
  color: #BEDDBF;
  .buy-now-label {
    color: black;
    margin-right: 0.5rem;
  }
`;

const BuyNowPrice = (props) => {
  return (
    <BuyNowPriceStyle>
      {
        props.buyNowPrice === null ? <></> : <label className="buy-now-label">즉시 구매가</label>
      }
      {props.buyNowPrice}
    </BuyNowPriceStyle>
  )
}

export default BuyNowPrice;