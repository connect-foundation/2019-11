import React from "react"
import ButtonSelect from "../components/Atoms/SelectOptionButton"
import ButtonDays from "../components/Atoms/DayButton"
import TradeListBox from "../components/Organisim/TradeListBox"

import { action } from "@storybook/addon-actions"

export default {
  title: "TradeList"
}

export const TradeListSelectButton = () => (
  <div>
    <ButtonSelect name="test" />
  </div>
)

export const TradeListDaysButton = () => (
  <div>
    <ButtonDays select={action("clicked")} />
  </div>
)

export const tradeListBox = props => {
  return (
    <TradeListBox
      registdate={"2018.11.21"}
      hopeprice={10000}
      deviation={10}
      title={"쓰아다아 싸"}
      thumbnail={
        "https://post-phinf.pstatic.net/MjAxODA0MDNfMjgy/MDAxNTIyNjgxNjQzMTc2.9zObByVQ-Az9SuNbnhDA34JAkBHBgBL0zh2xjibG8cIg.s9M1q3XTHMUBXLY1RuDZ7h40YZGu8RpXAEcTk4lKCxog.JPEG/bjsn-20171130-195451-000-resize.jpg?type=w1200"
      }
      status={"구매"}
      solddate={"2019.11.21"}
      soldprice={20000}
    />
  )
}
