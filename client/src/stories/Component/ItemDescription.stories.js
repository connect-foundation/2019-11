import React from 'react'

import ItemDescription from '../../components/ItemDescription'

export default ({
    title: 'ItemDescription'
})

export const itemDescription = () => {
    return (
        <ItemDescription title={'상품 설명'} maxLen={100}/>
    )
}