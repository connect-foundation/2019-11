import React, { useState } from "react"
import styled from "styled-components"
import ProductInfo from "../../components/Organisim/ProductInfo"
import ChatBox from "../../components/Organisim/Chat/ChatBox"
import AuctionGraph from "../../components/Organisim/AuctionGraph"
import Spinner from "../../components/Atoms/Spinner"
import { useFetch } from "../../hooks/useFetch"
import pathConfig from "../../config/path"

const ProductPageStyle = styled.div`
  display: flex;
  margin: 0 auto;
  width: 100%;
  max-width: 1440px;
  padding: var(--padding-md);
`

const MainColumn = styled.div`
  flex: 1;
  overflow-x: auto;
  overflow-x: hidden;
`

const TextStyle = styled.p`
  font-size: ${props => props.size};
`

const Section = styled.section`
  min-height: 400px;
  margin-bottom: var(--margin-xl);
  display: flex;
  ${props => (props.center ? "justify-content: center" : undefined)}
`

const ChatColumn = styled.div`
  width: 400px;
`

const Loading = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  border: 1px solid red;
`

const user = {
  id: "chsch1028",
  src: "https://i.pravatar.cc/150?img=4"
}

const ProductPage = ({ match }) => {
  const productId = match.params.id
  const fetchState = useFetch(`${pathConfig.productsWithBids}/${productId}`)

  return fetchState.loading ? (
    <Spinner />
  ) : (
    <ProductPageStyle>
      <MainColumn>
        <Section>
          <ProductInfo product={fetchState.response.data} />
        </Section>
        <Section center>
          <AuctionGraph />
        </Section>
      </MainColumn>
      <ChatColumn>
        <ChatBox productId={productId} user={user}></ChatBox>
      </ChatColumn>
    </ProductPageStyle>
  )
}

export default ProductPage
