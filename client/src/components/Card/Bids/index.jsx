import React from 'react';
import styled from 'styled-components';
import personIcon from '../../../assets/person.svg'

const BidsStyle = styled.div`
  display: flex;
  align-items: flex-end;
  img {
    width: 0.8rem;
    height: 0.8rem;
    margin-right: 0.1rem;
  }
  font-size: small;
`;

const Bids = ({bids}) => {
  return (
    <BidsStyle>
      <img src={personIcon}/>
      {bids}
    </BidsStyle>
  )
}

export default Bids;