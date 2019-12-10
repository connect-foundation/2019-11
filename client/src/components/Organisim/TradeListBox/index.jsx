import React, { useState } from "react";
import styled from "styled-components";
import TradeBox from "../../Molecules/TradeBase";
const TradeContents = styled.div`
  display: ${props => (props.isHover ? "flex" : "none")};
  flex-direction: row;
  height: 3rem;
  margin-bottom: 0.5rem;
  background-color: white;
  border-bottom: solid 1px;
`;
const RegistDate = styled.span`
  flex-grow: 1;
  min-width: 5rem;
  margin: auto 0.5rem;
  font-weight: 700;
`;
const HopePrice = styled.span`
  min-width: 5rem;
  margin: auto 0.5rem;
  font-weight: 700;
`;
const Deviation = styled.span`
  min-width: 5rem;
  margin: auto 0.5rem;
  font-weight: 700;
  color: ${props => (props.setColor > 0 ? "green" : "red")};
`;

const OptionPriceCheck = styled.div`
  display: ${props => (props.isCheck === null ? "none" : "block")};
`;
const Component = props => {
  const [isHover, setIsHover] = useState(false);
  let soldDate = new Date(props.solddate);
  let soldseconds = soldDate.getTime();
  return (
    <div onMouseOver={() => setIsHover(true)} onMouseOut={() => setIsHover(false)}>
      <TradeBox
        title={props.title}
        thumbnail={props.thumbnail}
        status={props.status}
        price={props.soldprice}
        time={soldseconds}
      />
      <TradeContents isHover={isHover}>
        <RegistDate>등록 날짜:{props.registdate}</RegistDate>
        <OptionPriceCheck isCheck={props.hopeprice}>
          <HopePrice>희망 가격:{props.hopeprice}</HopePrice>
          <Deviation setColor={props.deviation}>편차:{props.deviation}%</Deviation>
        </OptionPriceCheck>
      </TradeContents>
    </div>
  );
};

export default Component;
