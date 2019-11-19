import React from 'react';
import styled from 'styled-components'

const Button = styled.button`
    width:100%;
    font-size: 1em;
    background: ${props => props.selected ? '#e0e0e0' : 'white'};
    padding:0.5em;
    text-align: left;
    border:none;
    border-bottom: #dfdfdf solid 1px;
    outline:none;

    &:hover{
        background: ${props => props.selected ? '#dddddd' : 'whitesmoke'}
    }
`

const Components = props => {

    const handle = (event) => {
        props.event();
    }

    return (
        <Button selected={props.selected} onClick={handle}>{props.text}</Button>
    )
}

export default Components;