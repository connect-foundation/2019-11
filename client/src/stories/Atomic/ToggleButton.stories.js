import React from 'react'

import ToggleButton from '../../components/ToggleButton'

export default ({
    title: 'Atomic|ToggleButton'
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