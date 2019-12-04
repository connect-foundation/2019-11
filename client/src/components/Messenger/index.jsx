import React, { useState, useRef, useEffect } from "react"
import Container from "./Container"
import CategoryIcon from "../Organisim/CategoryBar/CategoryIcon"

function Messenger(props) {
  const [show, setShow] = useState(false)

  const node = useRef()

  useEffect(() => {
    document.addEventListener("mousedown", handleOnBlur)
  })
  const handleOnBlur = e => {
    if (!node.current.contains(e.target)) {
      setShow(false)
    }
  }
  function ChangeState() {
    props.onClick()
    setShow(!show)
  }

  return (
    <div ref={node}>
      <Container show={show} />
      <CategoryIcon
        color="var(--color-primary);"
        img={props.img}
        text="채팅"
        onClick={() => ChangeState()}
      ></CategoryIcon>
    </div>
  )
}

export default Messenger
