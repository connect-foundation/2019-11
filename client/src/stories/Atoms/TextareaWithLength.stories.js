import React from 'react'

import Textarea from '../../components/Atoms/TextareaWithLength'

export default ({
    title: 'Component|TextareaWithLength'
})

export const itemDescription = () => {
    return (
        <Textarea title={'상품 설명'} maxLen={100} />
    )
}