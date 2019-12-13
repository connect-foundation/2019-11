import React from 'react'

import AlertDialog from '../../components/Molecules/AlertDialog'

export default ({
    title: 'Modal|Alert'
})

export const alertDialog = () => {
    return (
        <AlertDialog title={'제목'} content={'취소 불가능'} />
    )
}

export const cancelDialog = () => {
    return (
        <AlertDialog title={'제목'} content={'취소 가능'} cancelAble={true} />
    )
}