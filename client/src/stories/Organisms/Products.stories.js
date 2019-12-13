import React from "react";

import "../../style/App.css";
import "../../style/index.css";

import AuctionGraph from "../../components/Organism/AuctionGraph";
import ProductInfo from "../../components/Organism/ProductInfo";
import ShareCollection from "../../components/Product/ShareCollection";

export default {
  title: "Organisms|Products"
};

export const AuctionGraphBox = () => {
  return <AuctionGraph />;
};

const product = {
  id: "12",
  src:
    "https://d1rkccsb0jf1bk.cloudfront.net/products/99993547/main/medium/gb05021_04-1454001319-8684.jpg",
  title: "애플 스마트 워치 3세대",
  seller: "최성찬",
  due: "1일 6시간 27분",
  price: "45,000"
};

export const ProductInfoBox = () => {
  return <ProductInfo product={product} />;
};

export const ShareCollectionBox = () => {
  return <ShareCollection />;
};
