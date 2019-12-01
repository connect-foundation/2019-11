import React, { useState } from "react"
import MainButton from "./MainButton"
import Container from "./Container"
import styled from "styled-components"

const MessengerBack = styled.div`
  display: block;
  position: absolute;
  width: 100%;
  height: 100%;
`

function Messenger(props) {
  const [show, setShow] = useState(false)

  function ChangeState() {
    setShow(!show)
  }

  let MessengerContent = null
  if (show) {
    MessengerContent = (
      <>
        <MessengerBack onClick={() => ChangeState()}></MessengerBack>
        <Container />
      </>
    )
  }
  return (
    <>
      {MessengerContent}
      <MainButton select={() => ChangeState()} />
    </>
  )
}

export default Messenger
