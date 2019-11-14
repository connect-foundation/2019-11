import React from 'react'
import styled from 'styled-components'

const Division = styled.div`
    position:relative;
    width: 15px;
    height: 15px;
    border-radius:50%;
    background: white;

    &::before, &::after {
        position: absolute;
        top: 7px;
        left: 2px;
        width: 10px;
        height: 1.5px;
        content: "";
        background-color: black;
        display: block;
    }

    &::before{
        -ms-transform: rotate(-45deg);
        -webkit-transform: rotate(-45deg);
        transform: rotate(-45deg);
    }

    &::after{
        -ms-transform: rotate(45deg);
        -webkit-transform: rotate(45deg);
        transform: rotate(45deg);
    }

    &:hover{
        cursor: pointer;
    }
`
const Components = (props) => {
    return (
        <Division onclick={event => props.onclick()} />
    )
}

export default Components;