import React from "react"
import styled from "styled-components"

const Progress = styled.div`
  width: 15em;
  height: 3em;
  border: var(--color-primary) 1.5px solid;
  border-radius: 3em;
  background: ${props =>
    props.disabled ? "var(--color-gray-lighter)" : props.active ? "var(--color-primary)" : "white"};
  color: ${props => (props.active ? "white" : "var(--color-primary)")};
  font-weight: bold;
  display: flex;

  cursor: pointer;
`

const Content = styled.span`
  margin: auto;
`

const Components = props => {
  const { disabled, active, text, onClick } = props

  return (
    <Progress disabled={disabled} active={active} onClick={onClick}>
      <Content>{text}</Content>
    </Progress>
  )
}

export default Components
