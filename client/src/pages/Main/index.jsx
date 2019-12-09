import React, { useState, useEffect } from "react"
import styled from "styled-components"
import { CardContainer } from "../../components"
import apiConfig from "../../config/api"
import pathConfig from "../../config/path"
const { apiUrl } = apiConfig
const { items } = pathConfig


const MainStyle = styled.div`
  display: flex;
  font-family: "BMJUA";
  width: 100%;
  flex-direction: column;
  justify-content: center;
  .category {
    display: flex;
    font-size: xx-large;
    justify-content: flex-start;
    padding-left: 10rem;
  }
`

const Main = () => {
  const [popular, setPopular] = useState([])
  const [deadline, setDeadline] = useState([])

  const getPopularList = () => {
    const url = `${apiUrl}${items.hot}`
    fetch(url)
      .then(result => result.json())
      .then(result => setPopular(result))
  }

  const getDeadLineList = () => {
    const url = `${apiUrl}${items.deadline}`
    fetch(url)
      .then(result => result.json())
      .then(result => setDeadline(result))
  }

  useEffect(() => {
    getPopularList()
    getDeadLineList()
  }, [])

  return (
    <MainStyle>
      <CardContainer items={popular} title={"HOT - 인기 경매 상품"} />
      <CardContainer items={deadline} title={"HURRY UP - 마감 임박 경매 상품"} />
    </MainStyle>
  )
}

export default Main
