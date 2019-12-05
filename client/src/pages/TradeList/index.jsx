import styled from "styled-components"
import React, { useState, useContext } from "react"
import ButtonSelect from "../../components/TradeList/ButtonSelect"
import ButtonDays from "../../components/TradeList/ButtonDays"
import Header from "../../components/Atoms/Header"
import Footer from "../../components/Atoms/Footer"
import TradeListBox from "../../components/Organisim/TradeListBox"
import InfiniteScroll from "../../components/Molecules/InfiniteScroll"

import userContext from "../../context/UserContext"

const Wraper = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
`
const TradeWrap = styled.div`
  display: flex;
  flex-direction: column;
  margin: 0 auto;
  width: 90%;
  height: 100%;
`

const RightAlign = styled.div`
  display: flex;
  justify-content: flex-end;
  height: 2rem;
  margin: 0 0 0.5rem;
`
const TradeContents = styled.div`
  height: 100%;
  overflow: auto;
  border: solid 1px;
  border-radius: 5px;
  &::-webkit-scrollbar {
    display: none !important; // 윈도우 크롬 등
  }
  margin-bottom: 0.5rem;
`
function TradeList(props) {
  const [isSale, setIsSale] = useState(true)
  const [isBuy, setIsBuy] = useState(true)
  const [dayago, setDayago] = useState(1)
  const [page, setPage] = useState(1)
  const [reset, setReset] = useState(false)
  const [user] = useContext(userContext)

  async function getData(sale, buy, day, page) {
    try {
      let resultFetch = await fetch(
        `http://${
          process.env.NODE_ENV === "development" ? "localhost:3000" : "honeybee.palda.shop"
        }/api/log/filter`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({
            userid: user.id,
            dayago: day,
            isSale: sale,
            isBuy: buy,
            page: page,
            limit: 10
          })
        }
      )
      let resultJson = await resultFetch.json()
      let resultData = await resultJson[0].reduce((acc, ele) => {
        let data = {
          title: ele.title,
          thumbnail: ele.thumbnailUrl,
          status: ele.seller.id === user.id ? "판매" : "구매",
          soldprice: ele.soldPrice,
          solddate: ele.soldDate,
          registdate: ele.registerDate,
          hopeprice: ele.hopePrice,
          deviation: (((ele.hopePrice - ele.soldPrice) / ele.soldPrice) * 100).toFixed(2)
        }
        acc.push(data)
        return acc
      }, [])

      setPage(page + 1)

      return resultData
    } catch (err) {
      console.log(err)
    }
  }

  function setSale() {
    setPage(1)
    setIsSale(!isSale)
    setReset(!reset)
  }

  function setBuy() {
    setPage(1)
    setIsBuy(!isBuy)
    setReset(!reset)
  }

  function setDay(day) {
    setPage(1)
    setDayago(day)
    setReset(!reset)
  }

  const drawer = item => item.map(value => <TradeListBox {...value} />)
  //랜더링.

  return (
    <Wraper>
      <TradeWrap>
        <Header text="거래 내역" />

        <RightAlign>
          <ButtonSelect name="판매" select={() => setSale()} />
          <ButtonSelect name="구매" select={() => setBuy()} />
        </RightAlign>
        <RightAlign>
          <ButtonDays
            select_1d={() => setDay(1)}
            select_1w={() => setDay(7)}
            select_1y={() => setDay(365)}
            select_3y={() => setDay(365 * 3)}
          />
        </RightAlign>
        <TradeContents>
          <InfiniteScroll
            reset={reset}
            fetcher={() => getData(isSale, isBuy, dayago, page)}
            drawer={drawer}
          />
        </TradeContents>
      </TradeWrap>
      <Footer />
    </Wraper>
  )
}

export default TradeList
