import React from 'react'
import styled from 'styled-components'

import NonBorderBox from '../NonBorderBox'

const Container = styled.div`
    width: 100%;
    display:flex;

    border-radius:5px;
    border: #dfdfdf solid 1.5px;
    overflow:hidden;

    input{
        text-align:right
    }

    &:focus-within {
        border: #ffae6a solid 1.5px;

        div{
            background: #ffae6a;
            color: white;
        }
    }
`

const WonDiv = styled.div`
    width: 2rem;
    height: 2rem;
    background: #dfdfdf;
    color: black;
    display:flex;
    justify-content:center;
    align-items:center;
`

const Component = (props) => {

    return (
        <Container>
            <NonBorderBox type={'input'} font={1}/>
            <WonDiv>
                <span>원</span>
            </WonDiv>
        </Container>
    )
}

export default Component