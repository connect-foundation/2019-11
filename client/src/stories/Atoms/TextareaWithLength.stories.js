import React from 'react'

import Textarea from '../../components/Atoms/TextareaWithLength'

export default ({
    title: 'Atoms|TextareaWithLength'
})

export const itemDescription = () => {
    return (
        <Textarea title={'상품 설명'} limit={100} />
    )
}