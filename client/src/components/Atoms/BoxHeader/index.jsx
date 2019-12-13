import React from "react"
import styled from "styled-components"

const Container = styled.div`
  width: 100%;
  height: 2.5rem;
  box-sizing: border-box;
  padding: 0.15rem 0.5rem;
  background-color: var(--color-primary);
  color: white;
  display: flex;
  justify-items: center;
`

const Title = styled.span`
  width: 100%;
  height: fit-content;
  font-size: 1.3rem;
  font-weight: 400;
  margin: auto;
  letter-spacing: 0.5rem;
`

const Components = props => {
  return (
    <Container>
      <Title>{props.text}</Title>
    </Container>
  )
}

export default Components
