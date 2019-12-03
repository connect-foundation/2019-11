import React from "react";
import styled from "styled-components";
import ShareCollection from "../../Product/ShareCollection";
import { convertToPrice } from "../../../utils/numberUtils";

const ProductInfoStyle = styled.div`
  display: flex;
  min-height: 400px;
  margin: 0 auto;
  justify-content: center;
`;

const ProductImageBox = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: center;
`;

const ProductImage = styled.img`
  width: 400px;
  height: 400px;
  border: 1px solid var(--color-gray);
  border-radius: 8px;
  padding: var(--padding-xs);
`;

const ProductDescBox = styled.div`
  width: 480px;
  padding-top: var(--padding-lg);
  padding-right: var(--padding-md);
`;

const ProductDescText = styled.span`
  color: ${props => (props.primary ? "var(--color-primary)" : "black")};
  font-weight: ${props => (props.bold ? "bold" : "normal")};
  font-size: ${props => (props.size === "sm" ? "0.8rem" : "1.1rem")};
  margin-left: var(--margin-sm);
`;

const ProductTitle = styled.div`
  margin-bottom: var(--margin-xl);
  font-size: 1.4rem;
  font-weight: bold;
  padding-left: var(--padding-lg);
  color: var(--color-darkgray);
`;

const ProductSeller = styled.div`
  text-align: right;
`;

const ProductDueDate = styled.div`
  margin: var(--margin-md) 0px;
  text-align: right;
`;

const ProductBid = styled.div`
  margin: var(--margin-md) 0px;
  text-align: right;
`;

const BidInput = styled.input`
  border: 1px solid var(--color-gray);
  border-right: none;
  padding: var(--padding-md);
  font-size: 0.8rem;
  min-width: 200px;
  ${ProductBid}:hover & {
    border-color: var(--color-darkgray-lighter);
  }
`;

const BidButton = styled.button`
  border: 1px solid black;
  padding: var(--padding-md);
  background-color: black;
  color: white;
  font-size: 0.8rem;
  font-weight: bold;
`;

const ProductPurchase = styled(ProductBid)`
  margin-bottom: var(--margin-xl);
`;

const PurchasePrice = styled.span`
  border: 1px solid var(--color-gray);
  display: inline-block;
  border-right: none;
  padding: var(--padding-md);
  font-size: 0.8rem;
  min-width: 200px;
  text-align: left;

  ${ProductPurchase}:hover & {
    border-color: var(--color-primary);
  }
`;

const PurchaseButton = styled(BidButton)`
  background-color: var(--color-primary);
  border-color: var(--color-primary);
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

const ProductInfo = ({ product }) => {
  const {
    id,
    buyerId,
    categoryCode,
    title,
    contents,
    startBidPrice,
    hopePrice,
    immediatePrice,
    thumbnailUrl,
    isAuction,
    images,
    soldPrice,
    soldDate,
    registerDate,
    auctionDeadline,
    extensionDate,
    seller
  } = product;

  return (
    <ProductInfoStyle>
      <ProductImageBox>
        <ProductImage src={thumbnailUrl} />
      </ProductImageBox>
      <ProductDescBox>
        <ProductTitle>{title}</ProductTitle>
        <ProductSeller>
          <ProductDescText size="sm">판매자</ProductDescText>
          <ProductDescText primary bold>
            {seller.name}
          </ProductDescText>
        </ProductSeller>
        <ProductDueDate>
          <ProductDescText size="sm">판매 종료 시간</ProductDescText>
          <ProductDescText primary bold>
            {auctionDeadline || "비경매 상품"}
          </ProductDescText>
        </ProductDueDate>
        <ProductBid>
          <BidInput placeholder="입찰가격" />
          <BidButton>입찰</BidButton>
        </ProductBid>
        <ProductPurchase>
          <PurchasePrice>
            즉시 구매가
            <ProductDescText primary bold size="sm">
              {`${convertToPrice(immediatePrice)} 원`}
            </ProductDescText>
          </PurchasePrice>
          <PurchaseButton>구매</PurchaseButton>
        </ProductPurchase>
        <ShareCollection></ShareCollection>
      </ProductDescBox>
    </ProductInfoStyle>
  );
};

export default ProductInfo;
