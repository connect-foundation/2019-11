import React from "react"
import styled from "styled-components"

import SelectBox from "../../Molecules/SelectBox"

const Container = styled.div`
  width: 100%;
  flex-direction: column;
  justify-content: flex-end;
  text-align: right;
`

const ItemDiv = styled.div`
  display: flex;
  width: 100%;
  justify-content: space-between;
`

const TermDescription = styled.span`
  color: #a0a0a0;
  font-size: 0.85rem;
`

const Title = styled.span`
  align-self: flex-start;
  font-size: 1.1rem;
  margin: auto 0;
`

const Component = props => {
  const { title, data, selected, handler } = props

  const [list, desc] = data

  return (
    <Container>
      <ItemDiv>
        <Title>{title}</Title>
        <SelectBox list={list} selected={selected} handler={handler} />
      </ItemDiv>
      <TermDescription>{desc ? desc[selected] : ""}</TermDescription>
    </Container>
  )
}

export default Component
