import React from "react"
import styled from "styled-components"

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 100%;
  height: 5rem;
  text-align: left;
`

const Text = styled.div`
  font-size: var(--font-size-xxl);
  font-weight: 700;
  color: var(--color-secondary);
`

const Header = props => {
  return (
    <Container>
      <Text>{props.text}</Text>
    </Container>
  )
}

export default Header
