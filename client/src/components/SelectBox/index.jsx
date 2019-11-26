import React, { useState } from 'react'
import styled from 'styled-components'
import ItemList from './List'

const Conatiner = styled.div`
    position:relative;
    width: 100%;
    max-width: 10rem;
    height: 2rem;
`

const ItemListDiv = styled.div`
    position: absolute;
    width: 100%;
    top: 2rem;
    z-index: 30;
    background:white;
    border-radius: 5px;
`

const BoxHeader = styled.button`
    width: 100%;
    height: 100%;
    padding: 0.25rem 0.5rem;
    outline: none;
    background: white;
    border-radius: 5px;
    border: #aaaaaa solid 1px;
    text-align:left;
    font-weight:700;

    &:hover {
        background: #dfdfdf;
    }
`

const Component = props => {

    const { list, selected, show , handler } = props

    const [header, setHeader] = useState('선택해주세요')
    const [open, setOpen] = useState(false)
    const handleListOpen = event => setOpen(!open)

    const listEvent = (idx) =>{
        setHeader(list[idx])
        handler(idx)
        setOpen(false)
    }

    return (
        <Conatiner>
            <BoxHeader onClick={handleListOpen}>{header}</BoxHeader>
            <ItemListDiv>
                <ItemList open={open} show={3 || show} list={list} selected={selected} handler={listEvent}></ItemList>
            </ItemListDiv>
        </Conatiner>
    )
}

export default Component
