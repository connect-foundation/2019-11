import React from 'react'

import RegisterTermSelector from '../../components/RegisterTermSelector'

export default ({
    title: 'Component|RegisterTermSelector'
})

export const itemDescription = () => {

    const data = [['Hello', 'Hallo', 'Aloha']]

    return (
        <RegisterTermSelector data={data} selectedIdx={0}/>
    )
}