import styled from 'styled-components';
import React from 'react';
import MessengerReceive from './MessengerReceive';
import MessengerSend from './MessengerSend';
const MessengerScroll = styled.div`
width:19.5rem;
height:10rem;
overflow-x:hidden;
overflow-y:auto;
`;
function MessengerChatWrap(props) {

    return (
        <MessengerScroll>
                <MessengerReceive ReceiveText={"test입니다. 아아아아아아아아아"}/>
                <MessengerReceive ReceiveText={"test입니다. 아아아아아아아아아"}/>
                <MessengerSend SendText={"test입니다. 아아아아아아아아아"}/>
                <MessengerSend SendText={"test입니다. 아아아아아아아아아"}/>
                <MessengerSend SendText={"test입니다. 아아아아아아아아아"}/>
                <MessengerReceive ReceiveText={"test입니다. 아아아아아아아아아"}/>
                <MessengerSend SendText={"afjaaaaaaaafefsafdsafdsafdsafdsafdsafdsafdsafdsafdsaffdsafdsa"}/>
                <MessengerReceive ReceiveText={"test입니다. 아아아아아아아아아"}/>
        </MessengerScroll>
    );
  }
  
  export default MessengerChatWrap;