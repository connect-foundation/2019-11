import React, { useState } from 'react'
import styled from 'styled-components'

import Progress from '../../components/RegisterProgress'
import CategoryPage from './1'
import SellKindPage from './2'
import InfoPage from './3'
import { phaseList } from './constants'


const WIDTH = 80;

const Container = styled.div`
    width: ${WIDTH}rem;
    height: 100%;
    overflow-y: auto;
    box-sizing:border-box;
    border-right: gray solid 1px;
    border-left: gray solid 1px;
    margin: 0 auto;
`

const Content = styled.div`
    width: 100%;
    height: calc(100vh - 10rem);
    box-sizing: border-box;
    background-color:whitesmoke;
    overflow-x:hidden;
`

const Window = styled.div`
    display:flex;
    width: ${phaseList.length * WIDTH}rem;
    height: 90%;

    transform: ${props => `translateX(${-props.phase * WIDTH}rem)`};
    transition: transform .2s ease-in-out;
`

const Page = () => {
    const [phase, setPhase] = useState(0);

    return (
        <Container>
            <Progress phase={phase} list={phaseList}/>
            <Content>
                <Window phase={phase}>
                    <CategoryPage width={80} prev={() => setPhase(0)} next={() => setPhase(1)}/>
                    <SellKindPage width={80} prev={() => setPhase(0)} next={() => setPhase(2)}/>
                    <InfoPage width={80} prev={() => setPhase(1)} next={() => setPhase(3)}/>
                </Window>
            </Content>
        </Container>
    )
}

export default Page