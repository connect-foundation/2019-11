import React from 'react'

import NextButton from '../components/BoxButton'

export default {
    title: 'BoxButton',
};

export const boxButton = () => {
    return (
        <NextButton text={'Hello'} onClick={event => alert('Hello')}/>
    )
}

export const nextButton = () => {
    return (
        <NextButton text={'Hello'} onClick={event => alert('Hello')}/>
    )
}