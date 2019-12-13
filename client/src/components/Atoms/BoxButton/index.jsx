import React from "react"
import styled from "styled-components"

const Button = styled.button`
  width: 10rem;
  height: 4rem;
  padding: 0.5rem 0.25rem;
  border: #bfbfbf solid 1px;
  background: None;
  font-size: 1.5rem;
  box-sizing: border-box;
  outline: none;

  transition: border 0.2s ease-in-out;

  &:hover,
  &:focus {
    border: var(--color-primary) solid 2px;
    border-radius: 10px;
  }
`

const Component = ({ onClick, text }) => {
  return <Button onClick={onClick}>{text}</Button>
}

export default Component
