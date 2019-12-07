import React from "react"
import styled from "styled-components"

import { isNumber } from "../../../utils/validator"

const Container = styled.div`
  width: 100%;
  display: flex;

  border-radius: 5px;
  border: #dfdfdf solid 1.5px;
  overflow: hidden;

  input {
    text-align: right;
  }

  &:focus-within {
    border: var(--color-primary) solid 1.5px;

    div {
      background: var(--color-primary);
      color: white;
    }
  }
`

const WonDiv = styled.div`
  width: 2rem;
  height: 2rem;
  background: #dfdfdf;
  color: black;
  display: flex;
  justify-content: center;
  align-items: center;
`
const NonBorderBox = styled.input`
  font-family: "BMJUA";
  width: 100%;
  padding: 0.25rem 0.5rem;
  box-sizing: border-box;
  border: none;
  outline: none;
  font-size: ${props => props.font}rem;
`

const Component = ({ money, handler }) => {
  const changeHandler = ev => {
    const input = ev.target.value.replace(/[^0-9]/g, "")
    handler(input.substring(0, 9))
  }

  return (
    <Container>
      <NonBorderBox value={money} onChange={changeHandler} font={1} />
      <WonDiv>
        <span>원</span>
      </WonDiv>
    </Container>
  )
}

export default Component
