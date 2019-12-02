import React from "react";
import styled from "styled-components";
import ProductInfo from "../../components/Organisim/ProductInfo";
import ChatBox from "../../components/Organisim/Chat/ChatBox";
import AuctionGraph from "../../components/Organisim/AuctionGraph";
import { useFetch } from "../../hooks/useFetch";

const ProductPageStyle = styled.div`
  display: flex;
  margin: 0 auto;
  width: 100%;
  max-width: 1440px;
  padding: var(--padding-md);
`;

const MainColumn = styled.div`
  flex: 1;
  overflow-x: auto;
  overflow-x: hidden;
`;

const TextStyle = styled.p`
  font-size: ${props => props.size};
`;

const Section = styled.section`
  min-height: 400px;
  margin-bottom: var(--margin-xl);
  display: flex;
  ${props => (props.center ? "justify-content: center" : undefined)}
`;

const ChatColumn = styled.div`
  width: 400px;
`;

const Loading = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  border: 1px solid red;
`;

const product = {
  id: "12",
  src:
    "https://d1rkccsb0jf1bk.cloudfront.net/products/99993547/main/medium/gb05021_04-1454001319-8684.jpg",
  title: "애플 스마트 워치 3세대",
  seller: "최성찬",
  due: "1일 6시간 27분",
  price: "45,000"
};

const user = {
  id: "chsch1028",
  src: "https://i.pravatar.cc/150?img=4"
};

const ProductPage = ({ match }) => {
  const fetchState = useFetch(`/api/products/${match.params.id}`);

  return <Loading>데이터를 페치하는 처리중입니다.</Loading>;
  return fetchState.loading ? (
    <Loading>데이터를 페치하는 처리중입니다.</Loading>
  ) : (
    <ProductPageStyle>
      <MainColumn>
        <Section>
          <ProductInfo product={product} />
        </Section>
        <Section center>
          <AuctionGraph />
        </Section>
      </MainColumn>
      <ChatColumn>
        <ChatBox productId={product.id} user={user}></ChatBox>
      </ChatColumn>
    </ProductPageStyle>
  );
};

export default ProductPage;
