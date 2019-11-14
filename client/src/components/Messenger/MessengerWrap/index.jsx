import styled from 'styled-components';
import React, { useState , useEffect} from 'react';

const MessengerDiv= styled.div` 
    position:fixed;
    bottom:7rem;
    right:1rem;
    width:20rem;
    height:25rem;
    border:solid 0.1rem;
    border-color:#FEAA6E;
    &::after{
        content: '';
        position: absolute;
        border-top: 1rem solid #FEAA6E;
        border-right: 0.5rem solid transparent;
        border-left: 0.5rem solid transparent;
        bottom: -1rem;
        right: 1.5rem;
    } 
`;

function MessengerWrap(props) {

    return (
        <MessengerDiv>

        </MessengerDiv>
    );
  }
  
  export default MessengerWrap;