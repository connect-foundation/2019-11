import React from 'react'

import InputBox from '../components/InputBox'
import WonBox from '../components/InputMoney'

export default {
    title: 'InputBox',
};

export const inputBox = () => {
    return(
        <InputBox font={2.3} value={'값'}/>
    )
}

export const wonBox = () => {
    return(
        <WonBox/>
    )
}