import React, { useState, useContext } from "react"
import styled from "styled-components"

import UserContext from "../../context/UserContext"

import Header from "../../components/Atoms/Header"
import TradeBox from "../../components/Molecules/TradeBox"
import InfiniteScroll from "../../components/Molecules/InfiniteScroll"
import Footer from "../../components/Atoms/Footer"

import { jsonFetch } from "../../services/fetchService"
import { limits } from "./contants"

import apiConfig from "../../config/api"
import pathConfig from "../../config/path"

const { apiUrl } = apiConfig
const { products } = pathConfig

const Container = styled.div`
  width: 100%;
  height: 100%;
  overflow-y: auto;
  display: flex;
  flex-direction: column;
`

const ContentContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  width: 60rem;
  height: 90%;
  padding: 1rem;
  margin: 5px auto;
  border-radius: 30px;
  overflow-y: auto;
`

const ScrollFrame = styled.div`
  width: 60rem;
  height: 90%;
  overflow-y: auto;
`

const Page = props => {
  const [page, setPage] = useState(0)
  const [user] = useContext(UserContext)

  const fetcher = async () => {
    const url = `${apiUrl}${products.onSale}`

    console.dir(user.id)

    const [list] = await jsonFetch(url, {}, { id: user.id, page, limits })
    setPage(page + 1)
    return list.map(value => {
      return {
        key: value.id,
        title: value.title,
        status: "경매중",
        thumbnail: value.thumbnailUrl,
        price: value.immediatePrice,
        time: new window.Date(value.registerDate)
      }
    })
  }

  const drawer = item => item.map(value => <TradeBox {...value} />)

  return (
    <Container>
      <ContentContainer>
        <Header text={"경매중인 내 상품"} />
        <ScrollFrame>
          <InfiniteScroll fetcher={fetcher} drawer={drawer} loadPerOnce={10} />
        </ScrollFrame>
      </ContentContainer>
      <Footer />
    </Container>
  )
}

export default Page
