import React from 'react'
import styled from 'styled-components'

const Container = styled.div`
    display: flex;
    width: 15em;
    height: 100%;
    overflow-y: auto;
    background-color: #ffe1a2;
    border-right: #FFA626 solid 2px;
    box-sizing: border-box;
    z-index: 1;
`;


const Components = (props) => {
    return (
        <Container open={props.open}/>
    )
}

export default Components