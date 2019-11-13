import React from 'react'
import styled from 'styled-components'

const Container = styled.div`
    display: flex;
    width: ${props => props.open ? '15em' : 0};
    height: 100%;
    overflow-y: auto;
    background: #FFA626;
    border:none;
    z-index: 1;

    transition: width .35s ease-in-out;
`


const Components = (props) => {
    return (
        <Container open={props.open}>
            
        </Container>
    )
}

export default Components