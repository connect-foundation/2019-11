import React from 'react';
import styled from 'styled-components';

const BidsStyle = styled.div``;

const Bids = (props) => {
  return (
    <BidsStyle>
      {props.bids}
    </BidsStyle>
  )
}

export default Bids;