import React from 'react';
import styled from 'styled-components';
import Card from '../Card';

const CardContainerStyle = styled.div`
  display: flex;
  justify-content: center;
  width: 100%;
  height: 17rem;
  margin-bottom: 2rem;
`;

const CardContainer = (props) => {
  return (
    <CardContainerStyle>
    {
      props.items.map(item => <Card item={item}/>)
    }
    </CardContainerStyle>
  )
}

export default CardContainer;