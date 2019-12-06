import React from "react"
import styled from "styled-components"
import firebase from "../../../shared/firebase"

const Button = styled.button`
  all: unset;

  border-color: var(--color-primary);
  border: solid 0.1rem;
  text-align: center;
  color: var(--color-primary);
  width: 10rem;
  height: 3rem;
  border-radius: 0.5rem;

  &:hover {
    cursor: pointer;
  }

  &:active {
    background-color: var(--color-primary);
    color: white;
  }
`

const CreateButton = props => {
  function makeRoom() {
    firebase.makeRoom(props.userId, props.sellerId)
  }
  return <Button onClick={makeRoom}>판매자와 대화나누기</Button>
}

export default CreateButton
