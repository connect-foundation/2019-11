import React from "react"
import CreateButton from "../../components/Messenger/CreateButton"
import RoomElement from "../../components/Messenger/Container/RoomElement"
import ChatMessage from "../../components/Messenger/Container/ChatCotainer/ChatMessage"
import MessengerDemo from "../../components/Messenger/Container/ChatCotainer"

export default {
  title: "Organisms|Messenger"
}

//방만들기 버튼
export const MessengerCreateButton = () => <CreateButton></CreateButton>

//메시지 목록 요소

export const MessengerRoomElement = () => {
  return <RoomElement Img={"A"} Name={"관리자"} RecentMsg={"짧은글"}></RoomElement>
}
export const MessengerRoomElementBigmessage = () => {
  return (
    <RoomElement
      Img={"A"}
      Name={"관리자"}
      RecentMsg={"길글테스트입니다.이것은너무길어서 짤릴것입니다."}
    ></RoomElement>
  )
}

//메시지 요소
export const MessengerReceiveElement = () => {
  return (
    <div>
      <ChatMessage isSend={false} Text={"받은거"} />
    </div>
  )
}
export const MessengerSendElement = () => {
  return (
    <div>
      <ChatMessage isSend={true} Text={"보낸거"} />
    </div>
  )
}

export const MessengerListDemo = () => {
  return (
    <div style={{ border: "solid 1px black", width: "20rem" }}>
      <RoomElement Img={"A"} Name={"관리자"} RecentMsg={"짧은글"}></RoomElement>
      <RoomElement
        Img={"A"}
        Name={"관리자"}
        RecentMsg={"길글테스트입니다.이것은너무길어서 짤릴것입니다."}
      ></RoomElement>
      <RoomElement Img={"A"} Name={"관리자"} RecentMsg={"짧은글"}></RoomElement>
    </div>
  )
}
export const MessengerChatDemo = () => {
  return (
    <div style={{ border: "solid 1px black", width: "20rem", height: "26rem" }}>
      <MessengerDemo roomNumber={1} />
    </div>
  )
}
