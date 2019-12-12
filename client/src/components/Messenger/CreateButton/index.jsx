import React from "react";
import styled from "styled-components";
import firebase from "../../../shared/firebase";

const Button = styled.button`
  margin: 0 var(--margin-xs);
  padding: var(--padding-xs);
  font-size: 0.5rem;
  font-weight: bold;
  color: var(--color-secondary);
  border-radius: 16px;
  display: inline-block;
  border: 1px solid var(--color-secondary);

  &:hover {
    color: white;
    background-color: var(--color-secondary);
    cursor: pointer;
  }
`;

const CreateButton = props => {
  function makeRoom() {
    firebase.makeRoom(props.userId, props.sellerId);
  }
  return <Button onClick={makeRoom}>판매자와 대화하기</Button>;
};

export default CreateButton;
