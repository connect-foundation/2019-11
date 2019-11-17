import React from 'react'
import styled from 'styled-components'

import ProgressButton from './ProgressButton'

const Container = styled.div`
    width: 100%;
    height: 7em;
    display:flex;
    flex-direction:column;
    position: relative;
    justify-content:center;
    align-items:center;

    margin: auto 0;
`

const ButtonDiv = styled.div`
    display:flex;
    width:100%;
    height: fit-content;
    border:none;
    outline:none;
    justify-content:space-between;
    z-index:1;
`

const CenterLine = styled.div`
    width:100%;
    height:1.5px;
    border: #FFAF6e dashed 0.75px;
    position:absolute;
    line-height:50%;
    box-sizing:border-box;
`

const Components = ( props ) => {

    const { phase, list, event } = props

    return(
        <>
            <Container>
                <ButtonDiv>
                    {list.map((value, idx) => <ProgressButton text={value} active={phase===idx} onClick={ev => {event(idx); console.dir(phase === idx)}}/>)}
                </ButtonDiv>
                <CenterLine/>
            </Container>
        </>
    )
}

export default Components