import React, { useState } from 'react'
import styled from 'styled-components'

import PageBase from '../../../../components/PageBase'
import BoxLink from '../../../../components/BoxLink'

const ContentDiv = styled.div`
    width:80%;
    margin: 0 auto;
`

const ButtonDiv = styled.div`
    width: 20rem;
    height: 14rem;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    margin: 0 auto;
`

const LinkBox = styled.a`
    width: 100%;
    height: 4rem;
    padding: 0.5rem 0.25rem;
    border: #bfbfbf solid 1px;
    background: #eeeeee;
    font-size: 1.3rem;
    box-sizing:border-box;
    text-decoration:none;
    color: black;
    line-height:2rem;

    transition: border .2s ease-in-out;

    &:hover, &:focus{
        border: #ffae6a solid 2px;
        border-radius: 10px;
    }
`

const Component = (props) => {
    const { width, next } = props

    return (
        <PageBase width={width}>
            <ContentDiv>
                <ButtonDiv>
                    <LinkBox href="/register">새 상품등록</LinkBox>
                    <LinkBox href="/">마이페이지로</LinkBox>
                    <LinkBox href="/">확인</LinkBox>
                </ButtonDiv>
            </ContentDiv>
        </PageBase>
    )
}

export default Component