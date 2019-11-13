import React from 'react'
import styled from 'styled-components'

import ProgressButton from './ProgressButton'

const Container = styled.div`
    width: 100%;
    height: 10em;
    display:flex;
    justify-content:center;
    position:relative;
    align-items:center;
`

const ButtonDiv = styled.div`
    display:flex;
    width:100%;
    height: fit-content;
    border:none;
    outline:none;
    justify-content:space-between;
    top:0;
    left:0;
`

const CenterLine = styled.div`
    width:100%;
    height:0.5px;
    border:none;
    background-color: #FFAf6e;
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
            </Container>
        </>
    )
}

export default Components