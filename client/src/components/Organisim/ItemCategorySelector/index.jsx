import React from 'react'
import styled from 'styled-components'
import ListBox from '../../Molecules/TitleListBox'
import ListItem from '../../Atoms/BtnListItem'
import ListHeader from '../../Atoms/BoxHeader'

const Container = styled.div`
    width:100%;
    display:flex;
    justify-content:space-between;
`

const generateTitle = (text) => {
    return <ListHeader text={text}/>
}

const generateCompoList = (list, selected, handler) => {
    if (list === undefined) return;

    return list.map((value, idx) => <ListItem key={value} text={value} selected={selected === idx} onClick={() => handler(idx)} /> )
}

const Components = (props) => {

    const { lTitle, lList, rTitle, rList, lIdx, lHandler, rIdx, rHandler } = props

    const leftEvent = idx => { lHandler(idx); rHandler(-1) }
    const rightEvent = idx => { rHandler(idx) }

    return (
        <>
            <Container>
                <ListBox title={generateTitle(lTitle)} list={generateCompoList(lList, lIdx, leftEvent)}></ListBox>
                <ListBox title={generateTitle(rTitle)} list={generateCompoList(rList[lIdx], rIdx, rightEvent)}/>
            </Container>
        </>
    )
}

export default Components