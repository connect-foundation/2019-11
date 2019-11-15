import React from 'react'
import styled from 'styled-components'

const Container = styled.div`
    width: 100%;
    height: 2em;
    display:flex;
    align-content:center;
    color: ${props=> props.active ? '#ffae6a' : 'black'};
    background: white;
    border-radius: 5px;
    
    font-family: 'BMJUA';
    font-weight: 600;

    &:hover{
        background:#dfdfdf;
    }
`

const Text = styled.span`
    width:fit-content;
    height:fit-content;
    margin: auto 0;
`

const Component = props => {
    const { selected } = props

    return (
        <Container active={selected}><Text>{props.text}</Text></Container>
    )
}

export default Component