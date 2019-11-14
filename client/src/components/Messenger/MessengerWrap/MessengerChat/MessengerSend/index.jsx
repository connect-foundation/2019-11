import styled from 'styled-components';
import React, { useState , useEffect} from 'react';

const Wrap= styled.div`
width:19.5rem;

display:flex;
justify-content: flex-end;

padding:0.25rem 0.25rem;
`;

const SandMsg= styled.span`
display:inline-block;
text-align:left;
word-break:break-all;

width:10rem;
padding:0.3rem 1rem;
background-color:#FEF2C7;
border-radius:1rem;
`;

function MessengerSand(props) {

    return (
      <Wrap>
          <SandMsg>
              {props.SendText}
          </SandMsg>
      </Wrap>
    );
  }
  
  export default MessengerSand;