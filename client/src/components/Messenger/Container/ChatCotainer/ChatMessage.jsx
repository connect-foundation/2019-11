import styled from 'styled-components';
import React from 'react';

const Wrap= styled.div`
width:19rem;

display:flex;
justify-content: ${props => props.isSend?"flex-end": ""};
padding:0.25rem 0.25rem;
margin:0 0.5rem 0 0;
`;

const MessageText= styled.span`
display:inline-block;
text-align:left;
word-break:break-all;

font-size:var(--font-size-xs);

width:10rem;
padding:0.3rem 1rem;
border:solid 0.1rem;
border-color:${props => props.isSend?"var(--color-primary-minus0)": "var(--color-primary)"};
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