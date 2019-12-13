import React from "react"
import styled from "styled-components"

const Button = styled.button`
  font-family: D2Coding, "D2 coding", monosapce;
  width: 100%;
  font-size: 1rem;
  background: ${props => (props.selected ? "var(--color-gray-lighter-plus)" : "white")};
  padding: 0.5em;
  text-align: left;
  border-bottom: var(--color-gray) solid 1px;
  outline: none;

  &:hover {
    background: ${props => (props.selected ? "var(--color-gray-darker)" : "whitesmoke")};
  }
`

const Component = props => {
  const { selected, onClick } = props

  const handle = e => onClick()

  return (
    <Button selected={selected} onClick={handle}>
      {props.text}
    </Button>
  )
}

export default Component
