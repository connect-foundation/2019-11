import React from 'react'
import styled from 'styled-components'
import ListBox from '../ListBox'

const Container = styled.div`
    width:100%;
    display:flex;
    justify-content:space-between;
`

const Components = (props) => {

    const { lTitle, lList, rTitle, rList, lIdx, lHandler, rIdx, rHandler } = props

    const leftEvent = idx => { lHandler(idx); rHandler(-1) }
    const rightEvent = idx => { rHandler(idx) }
   
    return (
        <>
            <Container>
                <ListBox title={lTitle} list={lList} selected={lIdx} onItemClick={leftEvent}></ListBox>
                <ListBox title={rTitle} list={rList[lIdx]} selected={rIdx} onItemClick={rightEvent}></ListBox>
            </Container>
        </>
    )
}

export default Components