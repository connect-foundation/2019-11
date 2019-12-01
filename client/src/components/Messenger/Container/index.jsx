import styled from "styled-components"
import React, { useState, useEffect } from "react"
import RoomElement from "./RoomElement"
import ChatCotainer from "./ChatCotainer"
import firebase from "../../../shared/firebase"

const MessengerDiv = styled.div`
  position: fixed;
  bottom: 7rem;
  right: 1rem;
  width: 20rem;
  height: 25rem;
  border: solid 0.1rem;
  border-color: var(--color-primary);
  background-color: white;

  z-index: 30;

  &::after {
    content: "";
    position: absolute;
    border-top: 1rem solid var(--color-primary);
    border-right: 0.5rem solid transparent;
    border-left: 0.5rem solid transparent;
    bottom: -1rem;
    right: 1.5rem;
  }
`

const MessengerScroll = styled.div`
  width: 100%;
  height: 100%;
  overflow-x: hidden;
  overflow-y: auto;
`
function Container(props) {
  const [RoomList, setRoomList] = useState([])
  const [ChatHistory, setChatHistory] = useState([])
  const [isRoomList, setIsRoomList] = useState(true)
  const [RoomNumber, setRoomNumber] = useState(0)
  const [RoomUser, setRoomUser] = useState(0)

  function initRoomList() {
    setRoomList([])
  }
  function initChat() {
    setChatHistory([])
  }
  function clickRoomList(flag) {
    setIsRoomList(flag)
  }
  const writeChat = e => {
    e.preventDefault()
    firebase.writeChat(1, 1, e.target.messengerText.value)
    e.target.messengerText.value = ""
  }
  let initMessenger = () => {
    return isRoomList ? (
      <MessengerScroll>
        <div>{() => firebase.getRoomData(1)}</div>
        <RoomElement
          clickroom={() => {
            setRoomNumber(1)
            setRoomUser("관리자")
            clickRoomList(false)
          }}
          Img={"A"}
          Name={"관리자"}
          RecentMsg={"회원가입을 환영합니다!"}
        />
        <RoomElement
          clickroom={() => {
            setRoomNumber(2)
            setRoomUser("백종원")
            clickRoomList(false)
          }}
          Img={"B"}
          Name={"백종원"}
          RecentMsg={"양파 볶음 1박스 50000원입니다."}
        />
      </MessengerScroll>
    ) : (
      <ChatCotainer
        clickback={() => {
          clickRoomList(true)
        }}
        roomNumber={RoomNumber}
        roomUser={RoomUser}
        writeChat={writeChat}
      ></ChatCotainer>
    )
  }

  useEffect(() => {
    initMessenger()
  }, [isRoomList])

  return <MessengerDiv>{initMessenger()}</MessengerDiv>
}

export default Container
