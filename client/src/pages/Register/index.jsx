import React, { useState } from "react"
import styled from "styled-components"

import Footer from "../../components/Atoms/Footer"
import Progress from "../../components/RegisterProgress"
import SelectCategory from "./template/SelectCategory"
import InsertInfo from "./template/InsertInfo"
import Complete from "./template/Complete"
import { phaseList, defaultData } from "./constants"

const WIDTH = 80

const Container = styled.div`
  width: 100%;
  height: 100%;
  overflow-y: auto;
`

const TemplateContainer = styled.div`
  width: ${WIDTH}rem;
  box-sizing: border-box;
  margin: 0 auto;
  min-height: 100%;
`

const Content = styled.div`
  width: 100%;
  box-sizing: border-box;
  overflow: hidden;
`

const Window = styled.div`
  display: flex;
  width: ${phaseList.length * WIDTH}rem;

  transform: ${props => `translateX(${-props.phase * WIDTH}rem)`};
  transition: transform 0.2s ease-in-out;
`

const Page = () => {
  const [phase, setPhase] = useState(0)
  const [maxPhase, setMaxPhase] = useState(0)
  const [data, setData] = useState(defaultData)

  return (
    <Container>
      <TemplateContainer>
        <Progress maxPhase={maxPhase} phase={phase} list={phaseList} event={setPhase} />
        <Content>
          <Window phase={phase}>
            <SelectCategory
              obj={data}
              width={80}
              next={() => {
                setPhase(1)
                setMaxPhase(1)
              }}
            />
            <InsertInfo
              obj={data}
              width={80}
              next={() => {
                setPhase(2)
                setMaxPhase(2)
              }}
            />
            <Complete obj={data} width={80} next={() => setPhase(3)} />
          </Window>
        </Content>
      </TemplateContainer>
      <Footer />
    </Container>
  )
}

export default Page
