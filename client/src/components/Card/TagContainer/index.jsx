import React from 'react';
import styled from 'styled-components';
// import Tag from '../Tag';

const TagContainerStyle = styled.div`
  display: flex;
  font-size: x-small;
  padding: 0.1rem;
`;
// <TagContainer isAuction={props.item.isAuction} date={props.item.date}/>

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

const TagContainer = (props) => {
  const getDDay = () => {
    const dday = new Date(props.date);
    const now = new Date();

    const gap = now.getTime() - dday.getTime();
    const result = Math.floor(gap / (1000 * 60 * 60 * 24)) * -1;
    return result;
  }
  return (
    <TagContainerStyle>
      {props.isAuction === true ? <IsAuctionTag>경매중</IsAuctionTag> : <></>}
      <DDayTag>D - {getDDay()}</DDayTag>
    </TagContainerStyle>
  );
}

export default  TagContainer;