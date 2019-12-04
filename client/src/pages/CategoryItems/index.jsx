import React, { useState, useEffect } from "react"
import styled from "styled-components"
import { CardContainer } from "../../components"
import { populars } from "../../mock"

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
  const [items, setItems] = useState([])

  const getItemList = () => {
    // fetch(
    //   `http://${
    //     process.env.NODE_ENV === "development" ? "localhost:3000" : "honeybee.palda.shop"
    //   }/api/items/${categoryCode}`
    // )
    //   .then(result => result.json())
    //   .then(result => setItems(result))
    setItems([...populars, ...populars])
  }
  useEffect(() => {
    getItemList()
  }, [])

  return (
    <MainStyle>
      <CardContainer items={items} title={categoryTitle} isWrap={true} />
    </MainStyle>
  )
}

export default CategoryItems
