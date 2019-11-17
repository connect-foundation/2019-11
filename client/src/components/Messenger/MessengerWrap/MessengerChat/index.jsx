import styled from 'styled-components';
import React from 'react';
import MessengerReceive from './MessengerReceive';
import MessengerSend from './MessengerSend';

function MessengerChatWrap(props) {

    return (
        <>
                <MessengerReceive ReceiveText={"test입니다. 아아아아아아아아아"}/>
                <MessengerReceive ReceiveText={"test입니다. 아아아아아아아아아"}/>
                <MessengerSend SendText={"test입니다. 아아아아아아아아아"}/>
                <MessengerSend SendText={"test입니다. 아아아아아아아아아"}/>
                <MessengerSend SendText={"test입니다. 아아아아아아아아아"}/>
                <MessengerReceive ReceiveText={"test입니다. 아아아아아아아아아"}/>
                <MessengerSend SendText={"afjaaaaaaaafefsafdsafdsafdsafdsafdsafdsafdsafdsafdsaffdsafdsa"}/>
                <MessengerReceive ReceiveText={"test입니다. 아아아아아아아아아"}/>
        </>
    );
  }
  
  export default MessengerChatWrap;