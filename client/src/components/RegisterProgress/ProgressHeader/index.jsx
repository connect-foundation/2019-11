import React from 'react'
import styled from 'styled-components'

const Header = styled.h2`
    font-family:'BMDOHYEON';
    color:#ffAf6e;
`

const Components = (props) => {
    return(
        <Header>{props.title}</Header>
    )
}

export default Components