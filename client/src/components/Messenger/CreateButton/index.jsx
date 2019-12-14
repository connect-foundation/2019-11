import React, { useContext } from "react";
import styled from "styled-components";
import firebase from "../../../shared/firebase";
import MessengerContext from "../../../context/MessengerContext";

const Button = styled.button`
  margin: 0 var(--margin-xs);
  padding: var(--padding-xs);
  font-size: 0.5rem;
  font-weight: bold;
  color: var(--color-secondary);
  border-radius: 16px;
  display: inline-block;
  border: 1px solid var(--color-secondary);
  background-color: white;

  &:hover {
    color: white;
    background-color: var(--color-secondary);
    cursor: pointer;
  }
`;

const CreateButton = props => {
  const [, setMessengerOpen] = useContext(MessengerContext);

  function makeRoom() {
    setMessengerOpen(true);
    firebase.makeRoom(props.userId, props.sellerId);
  }
  return <Button onClick={makeRoom}>{props.text}</Button>;
};

export default CreateButton;
