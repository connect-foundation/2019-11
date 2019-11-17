import styled from 'styled-components';
import React from 'react';

const Wrap= styled.div`
width:19.5rem;

display:flex;

padding:0.25rem 0.25rem;
`;

const ReceiveMsg= styled.span`
display:inline-block;
text-align:left;
word-break:break-all;

width:10rem;
padding:0.3rem 1rem;
background-color:#FEAA6E;
border-radius:1rem;
`;

function MessengerReceive(props) {

    return (
      <Wrap>
          <ReceiveMsg>
              {props.ReceiveText}
          </ReceiveMsg>
      </Wrap>
    );
  }
  
  export default MessengerReceive;