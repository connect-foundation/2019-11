import React, { useContext } from "react"
import styled from "styled-components"

import PageBase from "../../../../components/PageBase"
import ShareBox from "../../../../components/Molecules/ShareBox"
import { notice } from "../../../../constants/strings"
import apiConfig from "../../../../config/api"

import productContext from "../../context"

const ContentDiv = styled.div`
  width: 80%;
  margin: 0 auto;
`

const ButtonDiv = styled.div`
  width: 15rem;
  height: 14rem;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  margin: 0 auto;
  text-align: center;
`

const LinkBox = styled.a`
  width: 100%;
  height: 3rem;
  border: none;
  background: var(--color-secondary-plus1);
  font-size: var(--font-size-xl);
  border-radius: 1.5rem;
  text-decoration: none;
  color: white;
  line-height: 3rem;
  transition: background 0.15s ease-in-out;

  &:hover,
  &:focus {
    background: var(--color-secondary-plus1-lighter);
    font-weight: 700;
  }
`

const ShareDiv = styled.div`
  width: fit-content;
  height: fit-content;
  margin: 20px auto 30px auto;
`

const NoticeDiv = styled.div`
  width: 400px;
  height: 200px;
  font-family: "BMDOHYEON";
  font-size: var(--font-size-xl);
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  border: var(--color-secondary-plus1) dashed 1px;
  margin: 20px auto 50px auto;
`

const NoticeText = styled.div`
  width: 200px;
  word-break: keep-all;
`

const Component = ({ width }) => {
  const obj = useContext(productContext).data

  return (
    <PageBase width={width}>
      <ContentDiv>
        <NoticeDiv>
          <NoticeText>{notice.successRegister}</NoticeText>
        </NoticeDiv>
        <ShareDiv>
          <ShareBox url={apiConfig.url + `/products/${obj.productId}`} object={obj} />
        </ShareDiv>
        <ButtonDiv>
          <LinkBox href={`/products/${obj.productId}`}>상품 확인</LinkBox>
          <LinkBox href="/register">계속 등록</LinkBox>
          <LinkBox href="/">마이페이지로</LinkBox>
          <LinkBox href="/">확인</LinkBox>
        </ButtonDiv>
      </ContentDiv>
    </PageBase>
  )
}

export default Component
