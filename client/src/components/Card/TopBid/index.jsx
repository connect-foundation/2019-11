import React from 'react';
import styled from 'styled-components';

const TopBidStyle = styled.div``;

const TopBid = (props) => {
  return (
  <TopBidStyle>
    {props.topBid}
  </TopBidStyle>
  )
}

export default TopBid;