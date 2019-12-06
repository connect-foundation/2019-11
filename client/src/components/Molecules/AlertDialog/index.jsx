import React from "react"
import styled from "styled-components"

const Container = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 500;

  background: rgba(64, 64, 64, 0.6);
`

const Content = styled.div`
  width: 30rem;
  min-height: 3rem;
  background: white;
  border-radius: 10px;
  overflow: hidden;
  padding: 1rem;
`

const TitleContainer = styled.div`
  width: 100%;
  height: fit-content;
  text-align: left;
`

const BodyContainer = styled.div`
  width: 100%;
  min-height: 1rem;
  height: fit-content;
  margin: 0.3rem 0;
`

const ButtonContainer = styled.div`
  display: flex;
  flex-direction: row-reverse;
`

const Title = styled.div`
  padding: 0.5rem 0;
  font-size: 1.3rem;
`

const Body = styled.div`
  margin: 0.3rem 0;
  white-space: pre-wrap;
`

const Button = styled.button`
  width: fit-content;
  padding: 0.3rem 1rem;
  font-size: 1.1rem;
  border-radius: 10px;
  margin-left: 3px;
  color: white;
`

export const Components = ({ title, content, cancelAble, onCancel, onAccept, onDismiss }) => {
  const handleSuccess = async e => {
    if (onAccept !== undefined) await onAccept()
    if (onDismiss === undefined) return
    onDismiss()
  }

  const handleCancel = async e => {
    if (onCancel !== undefined) await onCancel()
    if (onDismiss === undefined) return
    onDismiss()
  }

  return (
    <Container>
      <Content>
        <TitleContainer>
          <Title>{title}</Title>
        </TitleContainer>
        <BodyContainer>
          <Body>{content}</Body>
        </BodyContainer>
        <ButtonContainer>
          <Button className={"success"} onClick={handleSuccess}>
            확인
          </Button>
          {cancelAble ? (
            <Button className={"danger"} onClick={handleCancel}>
              취소
            </Button>
          ) : (
            undefined
          )}
        </ButtonContainer>
      </Content>
    </Container>
  )
}

export default Components
