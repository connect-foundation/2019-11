import React from 'react';
import CreateButton from '../components/Messenger/CreateButton';
import MainButton from '../components/Messenger/MainButton';
import RoomElement from '../components/Messenger/Container/RoomElement';
import ChatMessage from '../components/Messenger/Container/ChatCotainer/ChatMessage';
import ChatCotainer from '../components/Messenger/Container/ChatCotainer';
import Messenger from '../components/Messenger'
export default {
  title: 'Messenger',
};

//방만들기 버튼
export const MessengerCreateButton = () => (
  <CreateButton>
  </CreateButton>
);

//메인 버튼
export const MessengerMainButton = () => {
  return(
      <MainButton>
      </MainButton>
  )
}

//메시지 목록 요소

export const  MessengerRoomElement = () => {
  return(
    <RoomElement Img={"A"} Name={"과장님"} RecentMsg={"test"}>
    </RoomElement>
  )
}
export const  MessengerRoomElementBigmessage = () => {
  return(
    <RoomElement Img={"A"} Name={"과장님"} RecentMsg={"ㅇ야ㅑ야야야야ㅑ야야야야ㅑ야야야ㅑ야야야야ㅑ양"}>
    </RoomElement>
  )
}

//메시지 요소
export const  MessengerReceiveElement = () => {
  return(
  <div>
    <ChatMessage isSend={false} Text={"받은거"}/>
  </div>
  )
}
export const  MessengerSendElement = () => {
  return(
  <div>
    <ChatMessage isSend={true} Text={"보낸거"}/>
  </div>
  )
}

export const  MessengerChatDummy = () => {
  return(
  <>
    <ChatCotainer/>
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