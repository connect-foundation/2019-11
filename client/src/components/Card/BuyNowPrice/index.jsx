import React from 'react';
import styled from 'styled-components';

const BuyNowPriceStyle = styled.div`
  display: flex;
  height: 1rem;
  font-size: small;
  color: #BEDDBF;
  label {
    color: black;
    margin-right: 0.5rem;
  }
`;

const BuyNowPrice = ({buyNowPrice}) => {
  return (
    <BuyNowPriceStyle>
      <label>즉시 구매가</label>
      {buyNowPrice}
    </BuyNowPriceStyle>
  )
}

export default BuyNowPrice;