import React from 'react';
import MessengerButton from '../components/Messenger/MessengerButton';
import MessengerWrap from '../components/Messenger/MessengerWrap';
import MessengerRoom from '../components/Messenger/MessengerWrap/MessengerRoom';
import MessengerReceive from '../components/Messenger/MessengerWrap/MessengerChat/MessengerReceive';
import MessengerSend from '../components/Messenger/MessengerWrap/MessengerChat/MessengerSend';
import MessengerChat from '../components/Messenger/MessengerWrap/MessengerChat';


import Messenger from '../components/Messenger'
export default {
  title: 'Messenger',
};



export const MainButton = () => {
  return(
      <>
      <MessengerButton>
      </MessengerButton>
      </>
  )
}

export const MessengerContents = () => {
  return(
      <>
      <MessengerWrap>
      </MessengerWrap>
      </>
  )
}

export const  MessengerRoomElement = () => {
  return(
  <>
    <MessengerRoom Img={"A"} Name={"과장님"} RecentMsg={"test"}/>
  </>
  )
}
export const  MessengerRoomElementBigmessage = () => {
  return(
  <>
    <MessengerRoom Img={"A"} Name={"과장님"} RecentMsg={"ㅇ야ㅑ야야야야ㅑ야야야야ㅑ야야야ㅑ야야야야ㅑ양"}/>
  </>
  )
}

export const  MessengerReceiveElement = () => {
  return(
  <div>
    <MessengerReceive ReceiveText={"test입니다. 아아아아아아아아아"}/>
  </div>
  )
}
export const  MessengerSendElement = () => {
  return(
  <div>
    <MessengerSend SendText={"test입니다. 아아아아아아아아아"}/>
  </div>
  )
}

export const  MessengerChatDummy = () => {
  return(
  <>
    <MessengerChat/>
  </>
  )
}



export const ActiveMessengeButton = () => {
  return(
      <>
      <Messenger>
      </Messenger>
      </>
  )
}