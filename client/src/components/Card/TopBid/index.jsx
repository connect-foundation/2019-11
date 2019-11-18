import React from 'react';
import styled from 'styled-components';

const TopBidStyle = styled.div`
  display: flex;
  height: 1rem;
  font-size: middle;
  color: #FEAA6E;
  label {
    color: black;
    margin-right: 0.5rem;
  }
`;

const TopBid = ({topBid}) => {
  return (
  <TopBidStyle>
    <label>현재 입찰가</label>
    {topBid}
  </TopBidStyle>
  )
}

export default TopBid;