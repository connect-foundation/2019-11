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

const Component = (props) => {
    const { width, next } = props

    return (
        <PageBase width={width}>
            <ContentDiv>
                <ButtonDiv>
                    <BoxLink href="/register">새 상품등록</BoxLink>
                    <BoxLink href="/">마이페이지로</BoxLink>
                    <BoxLink href="/">확인</BoxLink>
                </ButtonDiv>
            </ContentDiv>
        </PageBase>
    )
}

export default Component