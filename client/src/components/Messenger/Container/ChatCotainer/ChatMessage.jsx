import styled from 'styled-components';
import React from 'react';

const Wrap= styled.div`
width:19.5rem;

display:flex;
justify-content: ${props => props.isSend?"flex-end": ""};
padding:0.25rem 0.25rem;
`;

const MessageText= styled.span`
display:inline-block;
text-align:left;
word-break:break-all;

width:10rem;
padding:0.3rem 1rem;
background-color:${props => props.isSend?"#FEF2C7": "#FEAA6E"};
border-radius:1rem;
`;


function ChatMessage(props) {

return (
    <Wrap isSend = {props.isSend}>
        <MessageText isSend = {props.isSend}>
            {props.Text}
        </MessageText>
    </Wrap>
    );
}
  
  export default ChatMessage;