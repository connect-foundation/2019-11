import React from 'react'

import InputBox from '../components/InputBox'

export default {
    title: 'InputBox',
};

export const inputBox = () => {
    return(
        <InputBox font={2.3} value={'값'}/>
    )
}