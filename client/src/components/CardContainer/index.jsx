import React, { Component } from 'react';
import styled from 'styled-components';
import Card from '../Card';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding-left: 8rem;
`;

const Title = styled.label`
    display: flex;
    font-size: xx-large;
    justify-content: flex-start;
`;

const CardContainerStyle = styled.div`
  display: flex;
  justify-content: flex-start;
  width: 100%;
  height: 17rem;
  margin-bottom: 2rem;
`;

const CardContainer = ({title, items}) => {
  return (
    <Container>
      <Title>{title}</Title>
      <CardContainerStyle>
      {
        items.map(item => <Card item={item}/>)
      }
      </CardContainerStyle>
    </Container>
  )
}

export default CardContainer;