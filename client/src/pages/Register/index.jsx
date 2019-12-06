import React, { useState, useContext } from "react"
import styled from "styled-components"

import Footer from "../../components/Atoms/Footer"
import Progress from "../../components/Organisim/RegisterProgress"
import SelectCategory from "./template/SelectCategory"
import InsertInfo from "./template/InsertInfo"
import Complete from "./template/Complete"
import AlertDialog from "../../components/Molecules/AlertDialog"

import { base642Blob } from "../../utils/converter"
import { postJsonFetch } from "../../services/fetchService"
import { createThumbnail } from "../../services/imageService"
import { phaseList, defaultData, dialogOption } from "./constants"
import apiConfig from "../../config/api"
import pathConfig from "../../config/path"

import productContext from "./context"

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

const registerProduct = async ({ data, callback }) => {
  const timestamp = new Date().toUTCString()
  const productsHeader = { "x-timestamp": timestamp }
  const imageHeader = Object.assign(productsHeader, { "x-auth": "user" })
  const imageUrl = `${apiUrl}${storage.image}`
  const productUrl = `${apiUrl}${products}`

  data.thumbnail = await createThumbnail(base642Blob(data.images[0]))
  data.thumbnail = await postJsonFetch(imageUrl, imageHeader, { uri: data.thumbnail })

  for (let i = 0; i < data.images.length; i++)
    data.images[i] = await postJsonFetch(imageUrl, imageHeader, { uri: data.images[i] })

  callback(await postJsonFetch(productUrl, productsHeader, data))
}

const Page = () => {
  const product = useContext(productContext)
  product.data = defaultData

  const [phase, setPhase] = useState(0)
  const [maxPhase, setMaxPhase] = useState(0)
  const [open, setOpen] = useState(false)

  return (
    <Container>
      <TemplateContainer>
        <Progress maxPhase={maxPhase} phase={phase} list={phaseList} event={setPhase} />
        <Content>
          <Window phase={phase}>
            <SelectCategory
              width={80}
              next={() => {
                setPhase(1)
                setMaxPhase(1)
              }}
            />
            <InsertInfo
              width={80}
              next={() => {
                setPhase(2)
                setMaxPhase(2)
              }}
              registItem={() => setOpen(true)}
            />
            <Complete width={80} next={() => setPhase(3)} />
          </Window>
        </Content>
      </TemplateContainer>
      <Footer />
      {open ? (
        <AlertDialog
          {...dialogOption}
          cancelAble={true}
          onAccept={() => registerProduct(product)}
          onDismiss={() => setOpen(false)}
        />
      ) : (
        undefined
      )}
    </Container>
  )
}

export default Page
