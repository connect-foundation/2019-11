import React, { useState, useEffect } from "react"

import TradeBox from "../../components/Organism/TradeBox"
import InfiniteScroll from "../../components/Molecules/InfiniteScroll"

export default {
  title: "Molecules|InfiniteScroll"
}

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

export const infiniteScroll = () => {
  const fakeFetch = (delay = 1000) =>
    new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve(tradeDummy)
      }, delay)
    })

  const drawer = item => item.map(value => <TradeBox {...value} />)

  return (
    <>
      <InfiniteScroll fetcher={fakeFetch} drawer={drawer} />
    </>
  )
}
