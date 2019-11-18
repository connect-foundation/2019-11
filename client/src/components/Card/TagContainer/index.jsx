import React from 'react';
import styled from 'styled-components';
import getDDay from '../../../utils/getDDay'

const TagContainerStyle = styled.div`
  display: flex;
  font-size: x-small;
  padding: 0.1rem;
`;

const IsAuctionTag = styled.div`
  border-radius: 0.5rem;
  border: red solid 0.1rem;
  color: red;
  padding: 0.1rem 0.3rem 0.1rem 0.3rem;
  margin: 0.25rem;
`;

const DDayTag = styled.div`
  border-radius: 0.5rem;
  border: #FEAA6E solid 0.1rem;
  color: #FEAA6E;
  padding: 0.1rem 0.3rem 0.1rem 0.3rem;
  margin: 0.25rem;
`;

const TagContainer = ({isAuction, date}) => {
  const day = getDDay(date)

  return (
    <TagContainerStyle>
      {isAuction === true && <IsAuctionTag>경매중</IsAuctionTag>}
      <DDayTag>D - {day}</DDayTag>
    </TagContainerStyle>
  );
}

export default  TagContainer;