import React, { useState } from 'react'
import styled from 'styled-components'
import ItemList from '../ItemList'

const Container = styled.div`
    width:100%;
    display:flex;
    justify-content:space-between;
`

const Components = () => {
    const category = ['의류', '가전', '일상']
    const detail = [
        ['여성', '남성', '아동', '아웃도어'],
        ['TV', '컴퓨터', '형광등'],
        ['만화', '생활', '탈출']
    ]

    const [rightList, setRightList] = useState([])

    const handleCallback = (idx) => {
        setRightList(detail[idx])
    }

    return (
        <>
            <Container>
                <ItemList list={category} callback={handleCallback}></ItemList>
                <ItemList list={rightList}></ItemList>
            </Container>
        </>
    )
}

export default Components