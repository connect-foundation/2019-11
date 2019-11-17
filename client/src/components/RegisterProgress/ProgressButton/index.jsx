import React from 'react'
import styled from 'styled-components'

const Progress = styled.div`
    width: 15em;
    height: 3em;
    border: #FFAf6E 1.5px solid;
    border-radius:3em;
    background: ${props => props.active ? '#ffaf6e' : 'white'};
    color: ${props => props.active ? 'white' : '#ffaf6e'};
    font-weight: bold;
    display:flex;

    cursor: pointer;
`

const Content = styled.span`
    margin:auto;
`

const Components = (props) => {

    const { active, text, onClick } = props

    return(
        <Progress active={active} onClick={onClick}>
            <Content>{text}</Content>
        </Progress>
    )
}

export default Components