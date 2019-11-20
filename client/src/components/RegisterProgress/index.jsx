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

const renderProgress = (show, component) => {
    if (!show) return;
    return component
}

const Components = (props) => {

    const { phase, maxPhase, list, event } = props
    let show = phase !== list.length - 1;

    return (
        <Container>
            {
                renderProgress(show, <>
                    <ButtonDiv>
                    {
                        list.map((value, idx) => {
                            return <ProgressButton disabled={idx > maxPhase} text={value} active={phase === idx} onClick={ev => { 
                                if (idx <= maxPhase) event(idx);
                                else alert('작성되지 않은 정보가 있습니다.')
                            }} />
                        })
                    }
                    </ButtonDiv>
                    <CenterLine /></>)
            }

        </Container>
    )
}

export default Components