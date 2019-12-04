import styled from "styled-components"
import React, { useState, useEffect, useRef } from "react"
import ChatMessage from "./ChatMessage"
import firebase from "../../../../shared/firebase"
const MessengerChatScroll = styled.div`
  width: 100%;
  height: 80%;
  overflow-x: hidden;
  overflow-y: auto;
`

const MessengerChatHead = styled.div`
  position: relative;

  background-color: var(--color-primary-minus0);

  margin: 0.05rem 0.05rem;

  width: 19.9rem;

  height: 2.4rem;
`

const HostName = styled.div`
  display: flex;

  flex-direction: column;
  justify-content: center;
  text-align: center;
  height: 100%;
`
const BackButton = styled.button`
  all: unset;

  position: absolute;

  width: 2rem;
  height: 100%;
  top: 0;
  left: 0;

  &:hover {
    cursor: pointer;
  }
`

const MessengerChatFoot = styled.div`
  display: flex;

  background-color: var(--color-primary-minus0);

  margin: 0 0.05rem;

  width: 19.9rem;
  height: 10%;
`
const MessengerChatForm = styled.form`
  width: 100%;
  height: 100%;
`
const SendData = styled.div`
  display: flex;
  width: 100%;
  height: 100%;
`
const InputWrap = styled.div`
  display: flex;
  flex-grow: 1;
  width: 13rem;
  height: 1.8rem;
  margin: auto 0.2rem auto 0.4rem;
`
const ButtonWrap = styled.div`
  display: flex;
  width: 3rem;
  height: 1.8rem;
  margin: auto 0.4rem auto 0.2rem;
`
const Input = styled.input`
  all: unset;
  text-align: left;
  background-color: white;

  height: 100%;
  width: 100%;
  padding: 0 0.5rem;
  border-radius: 0.5rem;
`
const InputButton = styled.button`
  all: unset;
  text-align: center;
  height: 100%;
  width: 100%;

  background-color: var(--color-primary);
  color: white;

  border-radius: 0.5rem;
  &:hover {
    cursor: pointer;
  }
`
function ChatContainer(props) {
  const [chat, setChat] = useState({})

  let USERID = 1 //임시 나의 유저 id

  const messengerBodyRef = useRef()
  useEffect(() => {
    messengerBodyRef.current.scrollTo(0, messengerBodyRef.current.scrollHeight)
  })

  useEffect(() => {
    function listener(snapshot) {
      setChat(snapshot.val())
    }
    firebase.getRoomChat(props.roomNumber).on("value", listener)

    return () => firebase.getRoomChat(props.roomNumber).off("value", listener)
  }, [])

  return (
    <>
      <MessengerChatHead>
        <BackButton onClick={props.clickback}>&lt;</BackButton>
        <HostName>
          <span>{props.roomUser}</span>
        </HostName>
      </MessengerChatHead>
      <MessengerChatScroll ref={messengerBodyRef}>
        {chat === null ? (
          <div>인사를 나눠봐요!</div>
        ) : (
          Object.keys(chat).map(key => {
            return (
              <ChatMessage
                key={chat[key].time}
                isSend={chat[key].userid === USERID}
                Text={chat[key].text}
                Time={chat[key].time}
              />
            )
          })
        )}
      </MessengerChatScroll>

      <MessengerChatFoot>
        <MessengerChatForm onSubmit={props.writeChat}>
          <SendData>
            <InputWrap>
              <Input name="messengerText" type="text" placeholder="메시지를 입력하세요."></Input>
            </InputWrap>
            <ButtonWrap>
              <InputButton>입력</InputButton>
            </ButtonWrap>
          </SendData>
          <input type="hidden" name="roomNumber" value={props.roomNumber}></input>
        </MessengerChatForm>
      </MessengerChatFoot>
    </>
  )
}

export default ChatContainer
