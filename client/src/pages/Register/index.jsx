import React, { useState } from "react"
import styled from "styled-components"

import Footer from "../../components/Atoms/Footer"
import Progress from "../../components/Organisim/RegisterProgress"
import SelectCategory from "./template/SelectCategory"
import InsertInfo from "./template/InsertInfo"
import Complete from "./template/Complete"

import { base642Blob } from "../../utils/converter"
import { jsonFetch, putJsonFetch } from "../../services/fetchService"
import { createThumbnail } from "../../services/imageService"
import { phaseList, defaultData } from "./constants"
import apiConfig from "../../config/api"
import pathConfig from "../../config/path"

const { apiUrl } = apiConfig
const { storage, products } = pathConfig

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

const registerProduct = async obj => {
  const timestamp = new Date().toUTCString()
  const productsHeader = { "x-timestamp": timestamp }
  const imageHeader = Object.assign(productsHeader, { "x-auth": "user" })
  const imageUrl = `${apiUrl}${storage.image}`
  const productUrl = `${apiUrl}${products.create}`

  obj.thumbnail = await createThumbnail(base642Blob(obj.images[0]))
  obj.thumbnail = await jsonFetch(imageUrl, imageHeader, { uri: obj.thumbnail })

  for (let i = 0; i < obj.images.length; i++)
    obj.images[i] = await jsonFetch(imageUrl, imageHeader, { uri: obj.images[i] })

  return await putJsonFetch(productUrl, productsHeader, obj)
}

const Page = () => {
  const [phase, setPhase] = useState(0)
  const [maxPhase, setMaxPhase] = useState(0)
  const [data] = useState(defaultData)

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
              registItem={registerProduct}
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
