import React, { useState, useEffect } from "react";
import styled from "styled-components";
import ShareCollection from "../../Product/ShareCollection";
import { convertToPrice } from "../../../utils/numberUtils";
import axios from "axios";
import { getDa, getDateTime } from "../../../utils/stringUtils";
import apiConfig from "../../../config/api";
import pathConfig from "../../../config/path";
import moment from "moment";

const { apiUrl } = apiConfig;

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

const ProductBid = styled.form`
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

  const getDiffDateTime = (end, start) => {
    const t1 = moment(start);
    const t2 = moment(end);
    const diff = t2.diff(t1);

    const d = moment.duration(diff).days();
    const h = moment.duration(diff).hours();
    const m = moment.duration(diff).minutes();
    const s = moment.duration(diff).seconds();

    return { diff, d, h, m, s };
  };

  const { diff, d, h, m, s } = getDiffDateTime(auctionDeadline);
  const [deadLine, setDeadLine] = useState(
    diff > 0 ? `D-${d} ${h}:${m}:${s}` : "경매 마감"
  );

  const baseURL = apiUrl;

  const handleBidSubmit = e => {
    e.preventDefault();
    const params = {
      bidPrice: e.target.bidPrice.value,
      bidDate: getDateTime(),
      userId: 1,
      productId: id
    };

    axios.post(`${baseURL}${pathConfig.bids}`, params).then(response => {
      console.log(response);
    });
  };

  const handleImmediateSubmit = price => e => {
    e.preventDefault();
    const params = { soldPrice: price, soldDate: getDateTime(), buyerId: 1 };
    axios
      .put(`${baseURL}${pathConfig.products}${id}`, params)
      .then(response => {
        console.log(response);
      });
  };

  useEffect(() => {
    if (auctionDeadline) {
      const timer = setInterval(() => {
        const { diff, d, h, m, s } = getDiffDateTime(auctionDeadline);
        if (diff > 0) {
          setDeadLine(`D-${d} ${h}:${m}:${s}`);
        } else {
          clearInterval(timer);
          setDeadLine(`경매 마감`);
        }
      }, 1000);
      return () => {
        clearInterval(timer);
      };
    }
  }, [auctionDeadline, setDeadLine]);

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
          <ProductDescText size="sm">판매 종료일</ProductDescText>
          <ProductDescText primary bold>
            {auctionDeadline
              ? moment(auctionDeadline).format("YYYY년 MM월 DD일")
              : "비경매 상품"}
          </ProductDescText>
        </ProductDueDate>

        {isAuction ? (
          <ProductDueDate>
            <ProductDescText size="sm">남은 시간</ProductDescText>
            <ProductDescText primary bold>
              {deadLine || "비경매 상품"}
            </ProductDescText>
          </ProductDueDate>
        ) : (
          undefined
        )}

        <ProductBid onSubmit={handleBidSubmit}>
          <BidInput name="bidPrice" placeholder="입찰가격" />
          <BidButton>입찰</BidButton>
        </ProductBid>
        <ProductPurchase onSubmit={handleImmediateSubmit(immediatePrice)}>
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
