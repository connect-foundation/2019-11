import React from 'react'
import styled from 'styled-components'

const Progress = styled.div`
    width: 15em;
    height: 3em;
    border: #FFAf6E 0.7px solid;
    border-radius:3em;
    background: ${props => props.active ? '#ffaf6e' : 'white'};
    color: ${props => props.active ? 'white' : '#ffaf6e'};
    font-weight: bold;
    display:flex;
`

const Content = styled.span`
    margin:auto;
`

const Components = (props) => {
    return(
        <Progress active={props.active}>
            <Content>{props.text}</Content>
        </Progress>
    )
}

export default Components