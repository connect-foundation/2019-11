import React from "react";
import styled from "styled-components";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip
} from "recharts";

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

const data = [
  {
    time: "2019/10/11 15:00:00",
    bidPrice: 1000
  },
  {
    time: "2019/10/11 16:00:00",
    bidPrice: 2000
  },
  {
    time: "2019/10/11 17:00:00",
    bidPrice: 5000
  },
  {
    time: "2019/10/11 18:00:00",
    bidPrice: 10000
  },
  {
    time: "2019/10/11 19:00:00",
    bidPrice: 15000
  },
  {
    time: "2019/10/11 20:00:00",
    bidPrice: 30000
  },
  {
    time: "2019/10/11 21:00:00",
    bidPrice: 50000
  }
];

const AuctionGraph = () => {
  return (
    <AuctionGraphStyle>
      <AuctionGraphTitle>경매 현황</AuctionGraphTitle>
      <LineChart
        width={900}
        height={300}
        data={data}
        margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="time" />
        <YAxis />
        <Tooltip contentStyle={{ borderRadius: "8px", fontSize: "0.8rem" }} />
        <Line type="monotone" dataKey="bidPrice" stroke="#ff3466" />
      </LineChart>
    </AuctionGraphStyle>
  );
};

export default AuctionGraph;
