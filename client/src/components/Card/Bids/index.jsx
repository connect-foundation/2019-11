import React from 'react';
import styled from 'styled-components';

const BidsStyle = styled.div`
  img {
    width: 0.8rem;
    height: 0.8rem;
  }

  font-size: small;
`;

const Bids = (props) => {
  return (
    <BidsStyle>
      <img src="/icon/person.jpg"/>
      {props.bids}
    </BidsStyle>
  )
}

export default Bids;