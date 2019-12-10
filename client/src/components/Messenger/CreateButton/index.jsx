import React from "react"
import styled from "styled-components"
import firebase from "../../../shared/firebase"
import letmessengerbutton from "../../../assets/letmessengerbutton.svg"

const Button = styled.button`
  all: unset;

  width: 2rem;
  heigth: 2rem;

  &:hover {
    cursor: pointer;
  }
  img {
    width: 100%;
    heigth: 100%;
  }
`

const CreateButton = props => {
  function makeRoom() {
    firebase.makeRoom(props.userId, props.sellerId)
  }
  return (
    <Button onClick={makeRoom}>
      <img src={letmessengerbutton}></img>
    </Button>
  )
}

export default CreateButton
