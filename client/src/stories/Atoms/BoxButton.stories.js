import React from 'react'

import NextButton from '../../components/Atoms/BoxButton'

export default {
    title: 'Atoms|BoxButton',
};

export const boxButton = () => {
    return (
        <NextButton text={'Hello'} onClick={event => alert('Hello')} />
    )
}