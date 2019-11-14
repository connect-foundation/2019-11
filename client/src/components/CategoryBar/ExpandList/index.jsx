import React from 'react'
import styled from 'styled-components'

const Container = styled.div`
    display: flex;
    width: 15em;
    height: 100%;
    overflow-y: auto;
    background: #FFA626;
    border:none;
    z-index: 1;

    transform: translateX(${props => props.open ? '0' : '-15em'});
    transition: all .35s ease-in-out;
`;


const Components = (props) => {
    return (
        <Container open={props.open}>
            
        </Container>
    )
}

export default Components