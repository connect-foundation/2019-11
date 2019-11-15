import React from 'react';
import styled from 'styled-components';

const TopBidStyle = styled.div`
  display: flex;
  height: 1rem;
  font-size: middle;
  color: #FEAA6E;
  .top-bid-label {
    color: black;
    margin-right: 0.5rem;
  }
`;

const TopBid = (props) => {
  return (
  <TopBidStyle>
    <label className="top-bid-label">현재 입찰가</label>
    {props.topBid}
  </TopBidStyle>
  )
}

export default TopBid;