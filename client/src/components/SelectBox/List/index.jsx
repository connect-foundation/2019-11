import React from 'react'
import styled from 'styled-components'

import ListItem from './ListItem'

const Container = styled.div`
    width: 100%;
    height: ${props => (props.open ? 1 : 0) * props.count * 2}rem;
    box-sizing: border-box;
    overflow:hidden;
    transition: height .3s ease-in-out;
    border-radius:inherit;
`

const Wrapper = styled.div`
    width:100%;
    height: ${props => props.count * 2}rem;
    overflow-y: auto;
`

const Component = (props) => {
    const { open, show, selected, list } = props
    
    return (
        <Container open={open} count={show < list.length ? show : list.length}>
            <Wrapper count={show < list.length ? show : list.length}>
                {list.map((value, idx) => <ListItem text={value} selected={selected === idx} />)}
            </Wrapper>
        </Container>
    )
}

export default Component