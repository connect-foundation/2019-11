import styled from "styled-components"
import React, { useState, useEffect } from "react"
import ButtonSelect from "../../components/TradeList/ButtonSelect"
import ButtonDays from "../../components/TradeList/ButtonDays"
import Header from "../../components/Header"
import Footer from "../../components/Footer"
import TradeListBox from "../../components/Molecules/TradeListBox"
import InfiniteScroll from "../../components/InfiniteScroll"
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
`
let count = 1
function TradeList(props) {
  const [data, setData] = useState([])
  const [isSale, setIsSale] = useState(true)
  const [isBuy, setIsBuy] = useState(true)
  const [dayago, setDayago] = useState(1)
  const [page, setPage] = useState(1)
  const getData = (sale, buy, day, page) => {
    //http://honeybee.palda.shop/api/log/filter
    fetch("http://localhost:3000/api/log/filter", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        userid: 2, //임시 userid 고정
        dayago: day,
        isSale: sale,
        isBuy: buy,
        page: page,
        limit: 10
      })
    })
      .then(result => {
        return result.json()
      })
      .then(result => {
        let resultDatassss = result[0].reduce((acc, ele) => {
          acc.push({
            title: ele.title,
            thumbnail: ele.thumbnailUrl,
            status: "ㅅㄷㅅ",
            soldprice: ele.soldPrice,
            solddate: ele.soldDate,
            registdate: ele.registerDate,
            hopeprice: ele.hopePrice,
            deviation: 1111
          })
          return acc
        }, [])
        console.log(count)
        setData(resultDatassss)
      })
  }

  useEffect(() => {
    getData(isSale, isBuy, dayago, page)
  }, [isSale, isBuy, dayago])

  function setSale() {
    console.log("test")
    setPage(1)
    count++
    console.log(count)
    setIsSale(!isSale)
  }

  function setBuy() {
    setPage(1)
    count++
    setIsBuy(!isBuy)
  }

  function setDay(day) {
    setPage(1)
    count++
    setDayago(day)
  }

  const fakeFetch = () => {
    // console.log(count)
    return test() //tradeDummy/data
  }
  //에러 부분입니다.
  function test() {
    if (count < 10) {
      return [1]
    } else {
      return tradeDummy
    }
  }

  const drawer = item => item.map(value => <TradeListBox {...value} />)
  //랜더링.

  const tradeDummy = [
    {
      title: "임시데이터1",
      thumbnail:
        "https://post-phinf.pstatic.net/MjAxODA0MDNfMjgy/MDAxNTIyNjgxNjQzMTc2.9zObByVQ-Az9SuNbnhDA34JAkBHBgBL0zh2xjibG8cIg.s9M1q3XTHMUBXLY1RuDZ7h40YZGu8RpXAEcTk4lKCxog.JPEG/bjsn-20171130-195451-000-resize.jpg?type=w1200",
      status: "경매중",
      price: 3000
    },
    {
      title: "임시데이터2",
      thumbnail:
        "https://post-phinf.pstatic.net/MjAxODA0MDNfMjgy/MDAxNTIyNjgxNjQzMTc2.9zObByVQ-Az9SuNbnhDA34JAkBHBgBL0zh2xjibG8cIg.s9M1q3XTHMUBXLY1RuDZ7h40YZGu8RpXAEcTk4lKCxog.JPEG/bjsn-20171130-195451-000-resize.jpg?type=w1200",
      status: "경매중",
      price: 3000
    },
    {
      title: "임시데이터3",
      thumbnail:
        "https://post-phinf.pstatic.net/MjAxODA0MDNfMjgy/MDAxNTIyNjgxNjQzMTc2.9zObByVQ-Az9SuNbnhDA34JAkBHBgBL0zh2xjibG8cIg.s9M1q3XTHMUBXLY1RuDZ7h40YZGu8RpXAEcTk4lKCxog.JPEG/bjsn-20171130-195451-000-resize.jpg?type=w1200",
      status: "경매중",
      price: 3000
    },
    {
      title: "임시데이터4",
      thumbnail:
        "https://post-phinf.pstatic.net/MjAxODA0MDNfMjgy/MDAxNTIyNjgxNjQzMTc2.9zObByVQ-Az9SuNbnhDA34JAkBHBgBL0zh2xjibG8cIg.s9M1q3XTHMUBXLY1RuDZ7h40YZGu8RpXAEcTk4lKCxog.JPEG/bjsn-20171130-195451-000-resize.jpg?type=w1200",
      status: "경매중",
      price: 3000
    }
  ]

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
          <InfiniteScroll fetcher={fakeFetch} drawer={drawer} />
        </TradeContents>
      </TradeWrap>
      <Footer />
    </Wraper>
  )
}

export default TradeList
