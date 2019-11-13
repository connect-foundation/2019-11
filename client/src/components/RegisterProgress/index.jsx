import React from 'react'
import styled from 'styled-components'

import ProgressButton from './ProgressButton'

const Container = styled.div`
    width: 100%;
    height: 10em;
    display:flex;
    flex-direction:column;
    position: relative;
    justify-content:center;
    align-items:center;
`

const ButtonDiv = styled.div`
    display:flex;
    width:100%;
    height: fit-content;
    border:none;
    outline:none;
    justify-content:space-between;
    z-index:1;
`

const CenterLine = styled.div`
    width:100%;
    height:1.5px;
    border: #FFAF6e dashed 0.75px;
    position:absolute;
    line-height:50%;
    box-sizing:border-box;
`

const Components = () => {
    return(
        <>
            <Container>
                <ButtonDiv>
                    <ProgressButton text={"Step.1 카테고리"} active={true}/>
                    <ProgressButton text={"Step.2 판매방식"}/>
                    <ProgressButton text={"Step.3 상품등록"}/>
                    <ProgressButton text={"Step.4 완료"}/>
                </ButtonDiv>
                <CenterLine/>
            </Container>
        </>
    )
}

export default Components