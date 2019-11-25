import React from "react";
import styled from "styled-components";
import ProductInfo from "../components/Product/ProductInfo";
import ChatBox from "../components/Chat/ChatBox";
import AuctionGraph from "../components/Product/AuctionGraph";

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

const ProductPage = () => {
  return (
    <ProductPageStyle>
      <MainColumn>
        <Section>
          <ProductInfo product={product} />
        </Section>
        <Section center>
          <AuctionGraph />
        </Section>
        <Section>상품 상세 정보</Section>
        <Section>댓글 정보</Section>
      </MainColumn>
      <ChatColumn>
        <ChatBox productId={product.id} user={user}></ChatBox>
      </ChatColumn>
    </ProductPageStyle>
  );
};

export default ProductPage;
