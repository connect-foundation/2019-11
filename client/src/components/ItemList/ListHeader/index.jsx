import React from 'react'
import styled from 'styled-components'

const Container = styled.div`
    width: 100%;
    height: 2em;
    box-sizing: border-box;
    padding: 0.15em;
    background-color:#ffa66a;
    color:white;
    display:flex;
    justify-items:center;
`

const Title = styled.span`
    width: 100%;
    height:fit-content;
    font-size: 1.1em;
    font-weight: 700;
    margin: auto;
`

const Components = props => {
    return (
        <Container>
            <Title>{props.text}</Title>
        </Container>
    )
}

export default Components