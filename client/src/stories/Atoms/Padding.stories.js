import React from 'react'

export default ({
    title: 'Styles|Padding&Margin'
})

export const paddings = () => {
    return (
        <>
            <div style={{ padding: 'var(--padding-xs)' }}>다람쥐 헌 쳇바퀴에 타고파.</div>
            <div style={{ padding: 'var(--padding-sm)' }}>다람쥐 헌 쳇바퀴에 타고파.</div>
            <div style={{ padding: 'var(--padding-md)' }}>다람쥐 헌 쳇바퀴에 타고파.</div>
            <div style={{ padding: 'var(--padding-lg)' }}>다람쥐 헌 쳇바퀴에 타고파.</div>
            <div style={{ padding: 'var(--padding-xl)' }}>다람쥐 헌 쳇바퀴에 타고파.</div>
            <div style={{ padding: 'var(--padding-xxl)' }}>다람쥐 헌 쳇바퀴에 타고파.</div>
        </>
    )
}