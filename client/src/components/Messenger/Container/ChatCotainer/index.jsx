import styled from "styled-components"
import React from "react"
import ChatMessage from "./ChatMessage"
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
const InputWrap = styled.div`
  padding: 0.2rem;
  width: 16rem;
  height: 2rem;
`
const ButtonWrap = styled.div`
  padding: 0.2rem;

  width: 3.6rem;
  height: 2rem;
`
const Input = styled.input`
  all: unset;
  text-align: left;
  background-color: white;

  height: 2rem;
  width: 15.6rem;
  border-radius: 0.5rem;
`
const InputButton = styled.button`
  all: unset;
  text-align: center;
  height: 2rem;
  width: 3.4rem;

  background-color: var(--color-primary);
  color: white;

  border-radius: 0.5rem;
  &:hover {
    cursor: pointer;
  }
`
function ChatContainer(props) {
  return (
    <>
      <MessengerChatHead>
        <BackButton onClick={props.clickback}>&lt;</BackButton>
        <HostName>
          <span>{props.roomUser}</span>
        </HostName>
      </MessengerChatHead>
      <MessengerChatScroll>
        {props.roomNumber === 1 ? (
          <>
            <ChatMessage isSend={false} Text={"경매를 쉽고 재밌게 즐길수 있는 팔다입니다!"} />
            <ChatMessage isSend={false} Text={"회원가입을 환영합니다!"} />
          </>
        ) : (
          <>
            <ChatMessage isSend={true} Text={"안녕하세요"} />
            <ChatMessage isSend={false} Text={"안녕하세요"} />
            <ChatMessage isSend={true} Text={"양파볶음 맛있겠네요"} />
            <ChatMessage isSend={false} Text={"그지요?"} />
            <ChatMessage isSend={false} Text={"양파 볶음 1박스 50000원입니다."} />
          </>
        )}
      </MessengerChatScroll>
      <MessengerChatFoot>
        <InputWrap>
          <Input type="text" placeholder="메시지를 입력하세요."></Input>
        </InputWrap>
        <ButtonWrap>
          <InputButton>입력</InputButton>
        </ButtonWrap>
      </MessengerChatFoot>
    </>
  )
}

export default ChatContainer
