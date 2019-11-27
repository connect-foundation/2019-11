import React, { useState } from "react"
import styled from "styled-components"

const Container = styled.div`
  width: 100%;
  padding: 0.5rem 1rem;
  box-sizing: border-box;
  display: flex;
  border-radius: 10px;
  outline: none;
  border: ${props => (props.exceed ? "#ff0000" : "#dfdfdf")} solid 1.5px;
  justify-content: space-between;

  transition: border 0.15s ease-in-out;
  &:focus-within {
    border-color: ${props => (props.exceed ? "#ff0000" : "var(--color-primary-minus0)")};
  }
`

const NonBorder = styled.input`
  font-family: "BMJUA";
  width: 90%;
  height: fit-content;
  font-size: ${props => props.fontSize}rem;
  outline: none;
`

const Counter = styled.div`
  width: fit-content;
  font-size: 0.8rem;
  color: ${props => (props.exceed ? "var(--color-darkgray-darker)" : "var(--color-gray)")};
`

const Component = ({ size, limit, hint, onChange, value }) => {
  const [focus, setFocus] = useState(false)
  const [length, setLength] = useState(value.length)

  const handleOnChange = e => {
    const content = e.target.value
    onChange(content)
    setLength(content.length)
  }

  return (
    <Container foucs={focus} exceed={length > limit}>
      <NonBorder
        fontSize={size}
        placeholder={hint}
        onFocus={e => setFocus(true)}
        onBlur={e => setFocus(false)}
        onChange={handleOnChange}
        value={value}
      />
      <Counter exceed={length > limit}>{`${length} / ${limit}`}</Counter>
    </Container>
  )
}

export default Component
