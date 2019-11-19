import React from 'react'
import styled from 'styled-components'

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
const NonBorderBox = styled.input`
    font-family: 'BMJUA';
    width: 100%;
    padding: 0.25rem 0.5rem;
    box-sizing: border-box;
    border:none;
    outline:none;
    font-size:${props=> props.font}rem;
`

const Component = (props) => {

    const { money, handler } = props

    const changeHandler = ev => handler(ev.target.value)

    return (
        <Container>
            <NonBorderBox value={money} onChange={changeHandler} type={'input'} font={1}/>
            <WonDiv>
                <span>원</span>
            </WonDiv>
        </Container>
    )
}

export default Component