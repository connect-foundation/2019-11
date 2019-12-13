import React, { useState, useRef, useEffect, useContext } from "react";
import Container from "./Container";
import CategoryIcon from "../Organism/CategoryBar/CategoryIcon";
import MessengerContext from "../../context/MessengerContext";

function Messenger(props) {
  const [messengerOpen, setMessengerOpen] = useContext(MessengerContext);
  const [show, setShow] = useState(false);
  const node = useRef();
  useEffect(() => {
    if (messengerOpen) {
      OpenMessenger();
      setMessengerOpen(false);
    }
  }, [messengerOpen]);
  useEffect(() => {
    document.addEventListener("mousedown", handleOnBlur);
  });
  const handleOnBlur = e => {
    if (node.current !== (undefined || null)) {
      if (!node.current.contains(e.target)) {
        setShow(false);
      }
    }
  };
  function ChangeState() {
    props.onClick();
    setShow(!show);
  }

  function OpenMessenger() {
    setShow(true);
  }

  return (
    <div ref={node}>
      <Container show={show} open={OpenMessenger} />
      <CategoryIcon
        color="var(--color-primary);"
        img={props.img}
        text="채팅"
        onClick={() => ChangeState()}
      ></CategoryIcon>
    </div>
  );
}
export default Messenger;
