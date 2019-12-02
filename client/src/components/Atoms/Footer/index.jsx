import React from "react"
import styled from "styled-components"

const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 5rem;
  background: var(--color-quaternary);
  text-align: center;
  justify-content: center;

  font-family: "BMDOHYEON";
  color: white;
`

const Copyright = styled.div`
  font-size: 0.8rem;
  font-weight: 700;
`

const Component = () => {
  return (
    <Container>
      <Copyright>Copyright 2019. Team Palda, All right reserved</Copyright>
    </Container>
  )
}

export default Component
