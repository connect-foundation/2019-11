import React, { useState, useEffect } from "react"
import styled from "styled-components"
import { CardContainer } from "../../components"
import { populars } from "../../mock"
import { jsonFetch } from "../../services/fetchService"

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

const CategoryItems = ({ match }) => {
  const categoryCode = match.params.code
  const categoryTitle = match.params.title
  const [itemlist, setItemslist] = useState([])

  const fetcher = async () => {
    setItemslist([])
    const url = `${apiUrl}${items}${categoryCode}`
    let result = await fetch(url)
    const list = await result.json()

    setItemslist(list[0])
  }
  useEffect(() => {
    fetcher()
  }, [categoryCode, categoryTitle])

  return (
    <MainStyle>
      <CardContainer items={itemlist} title={categoryTitle} isWrap={true} />
    </MainStyle>
  )
}

export default CategoryItems
