import React, { useState } from "react"
import styled from "styled-components"
import TradeBox from "../TradeBox"
const TradeContents = styled.div`
  display: flex;
  flex-direction: row;
  height: 3rem;
  margin-bottom: 0.5rem;
  background-color: white;
  border: solid 1px;
`
const RegistDate = styled.span`
  flex-grow: 1;
  min-width: 5rem;
  margin: auto 0.5rem;
  font-weight: 700;
`
const HopePrice = styled.span`
  min-width: 5rem;
  margin: auto 0.5rem;
  font-weight: 700;
`
const Deviation = styled.span`
  min-width: 5rem;
  margin: auto 0.5rem;
  font-weight: 700;
`
const Component = props => {
  const [isHover, setIsHover] = useState(false)
  return (
    <div onMouseOver={() => setIsHover(true)} onMouseOut={() => setIsHover(false)}>
      <TradeBox
        title={props.title}
        thumbnail={props.thumbnail}
        status={props.status}
        price={props.soldprice}
        time={props.solddate}
      />
      {isHover ? (
        <TradeContents>
          <RegistDate>등록 날짜:{props.registdate}</RegistDate>
          <HopePrice>희망 가격:{props.hopeprice}</HopePrice>
          <Deviation>편차:{props.deviation}</Deviation>
        </TradeContents>
      ) : null}
    </div>
  )
}

export default Component
