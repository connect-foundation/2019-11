import styled from 'styled-components';
import React from 'react';

const ShowButton= styled.button` 
    all:unset;
    position:fixed;
    bottom:1rem;
    right:1rem;

    background-color:#FEAA6E;
    color:white;

    border-radius:4rem;
    border-style: solid;
    border-color: #FEAA6E;;

    font-weight:bold;
    text-align:center;
    width:4rem;
    height:4rem;
   
    &:hover{
        cursor:pointer;
    }
`;

function MessengerButton(props) {

    return (
        <ShowButton onClick={props.select}>메신저</ShowButton>
    );
  }
  
  export default MessengerButton;