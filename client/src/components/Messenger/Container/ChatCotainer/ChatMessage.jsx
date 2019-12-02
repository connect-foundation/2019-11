import styled from "styled-components"
import React, { useEffect } from "react"
import { sec2date } from "../../../../utils/sec2date"
import { dateDiff2Str } from "../../../../utils/converter"
const Wrap = styled.div`
  width: 19rem;

  display: flex;
  flex-direction: ${props => (props.isSend ? "row" : "row-reverse")};
  justify-content: ${props => (props.isSend ? "flex-end" : "flex-end")};
  padding: 0.25rem 0.25rem;
  margin: 0 0.5rem 0 0;
`

const MessageText = styled.span`
  display: inline-block;
  text-align: left;
  word-break: break-all;

  font-size: var(--font-size-xs);

  width: 10rem;
  padding: 0.3rem 1rem;
  border: solid 0.1rem;
  border-color: ${props => (props.isSend ? "var(--color-primary-minus0)" : "var(--color-primary)")};
  border-radius: 1rem;
`
const TimeText = styled.div`
  font-size: var(--font-size-xxs);
`

function ChatMessage(props) {
  return (
    <Wrap isSend={props.isSend}>
      <TimeText>{dateDiff2Str(sec2date(props.Time))}</TimeText>
      <MessageText isSend={props.isSend}>{props.Text}</MessageText>
    </Wrap>
  )
}

export default ChatMessage
