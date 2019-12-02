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
  const [isRoomList, setIsRoomList] = useState(true)
  const [RoomNumber, setRoomNumber] = useState(0)
  const [RoomUser, setRoomUser] = useState(0)

  let USERID = 1 //임시 나의 유저 id

  function clickRoomList(flag) {
    setIsRoomList(flag)
  }
  const writeChat = e => {
    e.preventDefault()
    firebase.writeChat(e.target.roomNumber.value, USERID, e.target.messengerText.value) //방번호, 유저번호
    e.target.messengerText.value = ""
  }

  let MessengerRoomList = () => {
    firebase.getRoomList(String(USERID)).then(result => {
      if (result !== null) {
        let roomNumbers = Object.keys(result).reduce((acc, ele) => {
          acc.push({
            RoomNumber: ele,
            RecentMeg: result[ele]["recent"]["text"],
            opponentUserName: getOpponentUserId(result[ele])
            // opponentUserImg:0,
          })
          return acc
        }, [])
        setRoomList(roomNumbers)
      }
    })
  }
  function getOpponentUserId(object) {
    return Object.keys(object).filter(word => word !== String(USERID) && word !== "recent")
  }
  let initMessenger = () => {
    return isRoomList ? (
      <MessengerScroll>
        {RoomList.map(value => {
          return (
            <RoomElement
              clickroom={() => {
                setRoomNumber(value.RoomNumber)
                setRoomUser(value.opponentUserName)
                clickRoomList(false)
              }}
              Img={"A"}
              Name={value.opponentUserName}
              RecentMsg={value.RecentMeg}
            />
          )
        })}
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
    MessengerRoomList()
  }, [isRoomList])

  return <MessengerDiv>{initMessenger()}</MessengerDiv>
}

export default Container
