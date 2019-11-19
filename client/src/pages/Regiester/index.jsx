import React, { useState } from 'react'
import styled from 'styled-components'

import Footer from '../../components/Footer'
import Progress from '../../components/RegisterProgress'
import SelectCategory from './template/SelectCategory'
import InsertInfo from './template/InsertInfo'
import Complete from './template/Complete'
import { phaseList } from './constants'

const WIDTH = 80;

const Container = styled.div`
    width: 100%;
    height:100%;
    overflow-y: auto;
`

const TemplateContainer = styled.div`
    width: ${WIDTH}rem;
    box-sizing:border-box;
    margin: 0 auto;
    min-height:100%;
`

const Content = styled.div`
    width: 100%;
    box-sizing: border-box;
    overflow:hidden;
`

const Window = styled.div`
    display:flex;
    width: ${phaseList.length * WIDTH}rem;

    transform: ${props => `translateX(${-props.phase * WIDTH}rem)`};
    transition: transform .2s ease-in-out;
`

const Page = () => {
    const [phase, setPhase] = useState(0);

    return (
        <Container>
            <TemplateContainer>
                <Progress phase={phase} list={phaseList} event={setPhase} />
                <Content>
                    <Window phase={phase}>
                        <SelectCategory width={80} next={() => setPhase(1)} />
                        <InsertInfo width={80} next={() => setPhase(2)} />
                        <Complete width={80} next={() => setPhase(3)} />
                    </Window>
                </Content>
            </TemplateContainer>
            <Footer />
        </Container>
    )
}

export default Page