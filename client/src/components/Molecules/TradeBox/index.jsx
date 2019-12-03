import React from "react"
import styled from "styled-components"

import { dateDiff2Str } from "../../../utils/converter"

const Container = styled.div`
  display: flex;
  width: 100%;
  min-height: fit-content;
  margin-bottom: 5px;
  justify-content: space-between;

  &:hover {
    img {
      width: 7rem;
      height: 7rem;
    }
  }
`

const Thumbnail = styled.img`
  width: 5rem;
  height: 5rem;

  transition: width 0.15s ease-in-out, height 0.15s ease-in-out;
`

const Title = styled.span`
  display: flex;
  width: 20rem;
  height: fit-content;
  font-size: 1.3rem;
  margin: auto 1rem;
`

const Status = styled.span`
  min-width: 7rem;
  height: fit-content;
  font-size: 1.1rem;
  margin: auto 0.5rem;
  text-align: center;
  font-weight: 700;
`

const Price = styled.span`
  min-width: 10rem;
  height: fit-content;
  font-size: 1rem;
  margin: auto 0.5rem;
  text-align: end;
`

const Date = styled.span`
  min-width: 5rem;
  height: fit-content;
  margin: auto 0.5rem;
  text-align: end;
  font-weight: 700;
  color: var(--color-gray-lighter-plus);
`

const Component = ({ title, thumbnail, status, price, time }) => {
  return (
    <Container>
      <Thumbnail src={thumbnail} />
      <Title>{title}</Title>
      <Status>{status}</Status>
      <Price>{price}원</Price>
      <Date>{dateDiff2Str(time)}</Date>
    </Container>
  )
}

export default Component
