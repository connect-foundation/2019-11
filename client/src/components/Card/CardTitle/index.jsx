import React from 'react';
import styled from 'styled-components';

const CardTitleStyle = styled.div`
  display: block;
  text-align: center;
`;

const CardTitle = (props) => {
  return(
    <CardTitleStyle>
      {props.title}
    </CardTitleStyle>
  )
}

export default CardTitle;