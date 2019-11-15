import React from 'react'
import styled from 'styled-components'

const Container = styled.div`
    width: 20em;
    height: 20em;
    display:flex;
    justify-content:center;
    align-items:center;
`

const Button = styled.div`
    position:relative;
    width: 15em;
    height: 15em;
    border: 0.5em solid lightgray;
    border-radius:50%;
    background: #efefef;
    transition: border 0.15s ease-in-out;

    &::before, &::after {
        position: absolute;
        top: 7em;
        left: 2.5em;
        width: 10em;
        height: 1em;
        content: "";
        background-color: lightgray;
        display: block;
        transition: background-color 0.15s ease-in-out;
    }

    &::after{
        -ms-transform: rotate(90deg);
        -webkit-transform: rotate(90deg);
        transform: rotate(90deg);
    }

    &:hover{
        cursor: pointer;
        border-color: darkgray;
        ::before, ::after{ background-color: darkgray}
    }
`

const Components = () => {
    return (
        <Container>
            <Button/>
        </Container>
    )
}

export default Components