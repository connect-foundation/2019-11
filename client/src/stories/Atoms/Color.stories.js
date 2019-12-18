import React from 'react'

export default ({
    title: 'Styles|Color'
})

export const primary = () => {
    return (
        <>
            <div style={{ backgroundColor: 'var(--color-primary)' }}>--color-primary</div>
            <div style={{ backgroundColor: 'var(--color-primary-minus0)' }}>--color-primary-minus0</div>
            <div style={{ backgroundColor: 'var(--color-primary-minus1)' }}>--color-primary-minus1</div>
            <div style={{ backgroundColor: 'var(--color-primary-minus2)' }}>--color-primary-minus2</div>
        </>
    )
}

export const secondary = () => {
    return (
        <>
            <div style={{ backgroundColor: 'var(--color-secondary-plus1)' }}>--color-secondary-plus1</div>
            <div style={{ backgroundColor: 'var(--color-secondary-plus1-lighter)' }}>--color-secondary-plus1-lighter</div>
            <div style={{ backgroundColor: 'var(--color-secondary-plus0)' }}>--color-secondary-plus0</div>
            <div style={{ backgroundColor: 'var(--color-secondary)' }}>--color-secondary</div>
            <div style={{ backgroundColor: 'var(--color-secondary-lighter)' }}>--color-secondary-lighter</div>
            <div style={{ backgroundColor: 'var(--color-secondary-minus0)' }}>--color-secondary-minus0</div>
            <div style={{ backgroundColor: 'var(--color-secondary-minus1)' }}>--color-secondary-minus1</div>
        </>
    )
}

export const tertiary = () => {
    return (
        <>
            <div style={{ backgroundColor: 'var(--color-tertiary-plus0)' }}>--color-tertiary-plus0</div>
            <div style={{ backgroundColor: 'var(--color-tertiary)' }}>--color-tertiary</div>
            <div style={{ backgroundColor: 'var(--color-tertiary-darker)' }}>--color-tertiary-darker</div>
        </>
    )
}

export const quaternary = () => {
    return (
        <>
            <div style={{ backgroundColor: 'var(--color-quaternary)' }}>--color-quaternary</div>
        </>
    )
}

export const grays = () => {
    return (
        <>
            <div style={{ backgroundColor: 'var(--color-gray-lighter)' }}>--color-gray-lighter</div>
            <div style={{ backgroundColor: 'var(--color-gray-lighter-plus)' }}>--color-gray-lighter-plus</div>
            <div style={{ backgroundColor: 'var(--color-gray)' }}>(--color-gray</div>
            <div style={{ backgroundColor: 'var(--color-gray-darker)' }}>--color-gray-darker</div>
            <div style={{ backgroundColor: 'var(--color-darkgray-lighter)' }}>--color-darkgray-lighter</div>
            <div style={{ backgroundColor: 'var(--color-darkgray)' }}>--color-darkgray</div>
            <div style={{ backgroundColor: 'var(--color-darkgray-darker)' }}>--color-darkgray-darker</div>
        </>
    )
}

export const etc = () => {
    return (
        <>
            <div style={{ backgroundColor: 'var(--color-on-sale)' }}>--color-on-sale</div>
            <div style={{ backgroundColor: 'var(--color-success)' }}>--color-success</div>
            <div style={{ backgroundColor: 'var(--color-success-lighter)' }}>--color-success-lighter</div>
            <div style={{ backgroundColor: 'var(--color-warning)' }}>--color-warning</div>
            <div style={{ backgroundColor: 'var(--color-danger)' }}>--color-danger</div>
            <div style={{ backgroundColor: 'var(--color-danger-lighter)' }}>--color-danger-lighter</div>
        </>
    )
}