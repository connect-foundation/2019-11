import React from 'react';
import styled from 'styled-components'

const Button = styled.button`
    font-family: D2Coding, 'D2 coding', monosapce;
    width:100%;
    font-size: 1rem;
    background: ${props => props.selected ? '#e0e0e0' : 'white'};
    padding:0.5em;
    text-align: left;
    border-bottom: #dfdfdf solid 1px;
    outline:none;

    &:hover{
        background: ${props => props.selected ? '#dddddd' : 'whitesmoke'}
    }
`

const Components = props => {

    const { selected, onClick } = props 

    const handle = event => onClick()

    return (
        <Button selected={selected} onClick={handle}>{props.text}</Button>
    )
}

export default Components;