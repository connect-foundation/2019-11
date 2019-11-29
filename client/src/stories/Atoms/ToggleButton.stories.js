import React from 'react'

import ToggleButton from '../../components/Atoms/ToggleButton'

export default ({
    title: 'Atoms|ToggleButton'
})

export const nonChecked = () => {
    return (
        <ToggleButton checked={false} />
    )
}

export const checked = () => {
    return (
        <ToggleButton checked={true} />
    )
}