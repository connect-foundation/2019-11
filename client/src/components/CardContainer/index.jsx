import React from 'react';
import styled from 'styled-components';
import Card from '../Card';

const CardContainerStyle = styled.div`
  display: flex;
  justify-content: center;
  width: 100%;
  height: 17rem;
`;

const CardContainer = (props) => {
  console.log(props.populars)
  return (
    <CardContainerStyle>
    {
      props.populars.map(item => <Card item={item}/>)
    }
    </CardContainerStyle>
  )
}

export default CardContainer;