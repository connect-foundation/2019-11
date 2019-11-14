import React, { useState } from 'react'
import styled from 'styled-components'

import ItemList from './List'

const Conatiner = styled.div`
    position:relative;
    width: 14rem;
    height: 2rem;
`

const ItemListDiv = styled.div`
    position: absolute;
    width: 100%;
    top: 2rem;
    z-index: 30;
    background:white;
`

const BoxHeader = styled.button`
    width: 100%;
    height: 100%;
    padding: 0.25rem;
    outline: none;
    background: white;
    border-radius: 5px;
    border: #aaaaaa solid 1px;
    text-align:left;

    &:hover {
        background: #dfdfdf;
    }

`

const Components = props => {

    const { list } = props

    const [header, setHeader] = useState('선택해주세요')
    const [open, setOpen] = useState(false)
    const handleListOpen = event => setOpen(!open)

    return (
        <Conatiner>
            <BoxHeader onClick={handleListOpen}>{header}</BoxHeader>
            <ItemListDiv>
                <ItemList open={open} show={3} list={list} selected={2}></ItemList>
            </ItemListDiv>
        </Conatiner>
    )
}

export default Components
