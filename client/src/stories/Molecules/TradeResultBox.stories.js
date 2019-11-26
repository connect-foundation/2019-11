import React from 'react';

import TradeBox from '../../components/Molecules/TradeBox'

export default {
  title: 'Molecules|TradeResultBox',
};

export const tradeResultBox = (props) => {
    return (
        <TradeBox isOk={true} title={"쓰아다아 싸"} status={'정상'} due={'2019.11.21'} price={20000} percent={20} diff={'2000'} />
    )
}

export const tradeResultBoxNot = (props) => {
    return (
        <TradeBox isOk={false} title={"쓰아다아 싸"} />
    )
}

export const myItem = (props) => {
    return (
        <TradeBox isOk={true} title={"쓰아다아 싸"} status={'입찰'} due={'~2019.11.21'} price={300000}/>
    )
}
