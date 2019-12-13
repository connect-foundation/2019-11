import React from 'react'

import RegisterTermSelector from '../../components/Organism/RegisterTermSelector'

export default ({
    title: 'Organisms|RegisterTermSelector'
})

export const itemDescription = () => {

    const data = [['Hello', 'Hallo', 'Aloha']]

    return (
        <RegisterTermSelector data={data} selectedIdx={0} />
    )
}