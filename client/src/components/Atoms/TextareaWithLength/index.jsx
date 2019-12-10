import React, { useState } from "react"
import styled from "styled-components"

const Container = styled.div`
  width: 100%;
  border: none;
  outline: none;
`

const Header = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  margin-bottom: 5px;
`

const Title = styled.span`
  font-weight: bold;
`

const Counter = styled.span`
  color: ${props => (props.isOver ? "var(--color-danger)" : "var(--color-gary)")};
  font-weight: ${props => (props.isOver ? "700" : "400")};
  font-size: 0.9rem;
`

const Content = styled.textarea`
  font-family: D2Coding, "D2 coding", monosapce;
  width: 100%;
  height: 20rem;
  border: var(--color-primary) solid 1px;
  resize: none;
  box-sizing: border-box;
  border-radius: 10px;
  outline: none;
  font-size: 1.2rem;
  padding: 1rem;
`

const Component = ({ title, limit, content, handler, isBlockMode }) => {
  const [len, setLen] = useState(content ? content.length : 0)

  const handleContent = event => {
    const content = event.target.value
    const validContent =
      isBlockMode && content.length > limit ? content.substring(0, limit) : content
    handler(validContent)
    setLen(validContent.length)
  }

  const handleBlock = e => {
    if (e.target.value.length >= limit) e.preventDefault()
  }

  return (
    <Container>
      <Header>
        <Title>{title}</Title>
        <Counter isOver={len > limit}>{`(${len} / ${limit})`}</Counter>
      </Header>
      <Content
        placeholder={`최대 ${limit}글자 입니다.`}
        onChange={handleContent}
        onKeyDown={isBlockMode ? handleBlock : undefined}
        value={content}
      />
    </Container>
  )
}

export default Component
