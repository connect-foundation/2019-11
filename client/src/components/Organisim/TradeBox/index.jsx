import React, { useState } from "react"
import styled from "styled-components"

import TradeBase from "../../Molecules/TradeBase"

const Container = styled.div`
  width: 100%;
  height: fit-content;
  border-bottom: var(--color-gray) solid 1px;
  margin-bottom: var(--margin-xs);
`

const LinkWrapper = styled.a`
  width: fit-content;
  height: fit-content;
  text-decoration: none;
  color: black;
`

const ButtonDiv = styled.div`
  display: flex;
  flex-direction: row-reverse;
  width: 100%;
  height: ${props => (props.hover ? 3 : 0)}rem;
  overflow: hidden;
  box-sizing: border-box;
  align-items: center;

  transition: height 0.15s ease-in-out;
`

const Button = styled.button`
  background: none;
  height: fit-content;
  margin: var(--margin-xs);
  padding: var(--padding-xs) var(--padding-sm);
  font-size: var(--font-size-lg);
  font-weight: 700;
  color: white;
  border-radius: 10px;
`

const Components = ({ id, link, ...otherProps }) => {
  const [hover, setHover] = useState(false)

  return (
    <Container onMouseEnter={e => setHover(true)} onMouseLeave={e => setHover(false)}>
      <LinkWrapper href={link}>
        <TradeBase {...otherProps} />
      </LinkWrapper>
      <ButtonDiv hover={hover}>
        <Button className={"danger"}>삭제</Button>
        <Button className={"warning"}>수정</Button>
      </ButtonDiv>
    </Container>
  )
}

export default Components
