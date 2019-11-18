import React from 'react';
import styled from 'styled-components';
import Card from '../Card';

const Title = styled.label`
    display: flex;
    font-size: xx-large;
    justify-content: flex-start;
    padding-left:10rem;
`;

const CardContainerStyle = styled.div`
  display: flex;
  justify-content: center;
  width: 100%;
  height: 17rem;
  margin-bottom: 2rem;
`;

const CardContainer = ({title, items}) => {
  return (
    <>
      <Title>{title}</Title>
      <CardContainerStyle>
      {
        items.map(item => <Card item={item}/>)
      }
      </CardContainerStyle>
    </>
  )
}

export default CardContainer;