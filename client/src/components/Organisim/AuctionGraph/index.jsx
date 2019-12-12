import React, { useContext } from "react";
import styled from "styled-components";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip } from "recharts";
import ProductPageContext from "../../../context/ProductPageContext";

const AuctionGraphStyle = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  border: 1px solid var(--color-gray);
  border-radius: 8px;
  font-size: 0.9rem;
  padding: var(--padding-sm);
`;

const AuctionGraphTitle = styled.div`
  width: 100%;
  padding-left: var(--padding-md);
  margin-bottom: var(--margin-xl);
  font-size: 1.1rem;
  font-weight: bold;
  color: var(--color-darkgray);
`;

const AuctionCountText = styled.span`
  margin-left: 16px;
  font-size: 0.9rem;
  color: var(--color-primary);
`;

const AuctionGraph = () => {
  const [productPageState] = useContext(ProductPageContext);

  const { bids } = productPageState;

  return (
    <AuctionGraphStyle>
      <AuctionGraphTitle>
        경매 현황<AuctionCountText>총 {bids.length}건</AuctionCountText>
      </AuctionGraphTitle>
      <LineChart
        width={900}
        height={300}
        data={bids}
        margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="bidDate" />
        <YAxis />
        {bids.length > 0 ? (
          <Tooltip contentStyle={{ borderRadius: "8px", fontSize: "0.8rem" }} />
        ) : (
          undefined
        )}
        <Line type="monotone" dataKey="bidPrice" stroke="#ff3466" />
      </LineChart>
    </AuctionGraphStyle>
  );
};

export default AuctionGraph;
