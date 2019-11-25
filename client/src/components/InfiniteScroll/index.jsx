import React, { useEffect, useState, useCallback } from 'react'
import styled from 'styled-components'
import useIntersect from './useIntersect'

import TradeBox from '../Molecules/TradeBox'

const Container = styled.div`
    width: 100%;
    padding: 1rem;
    border: black solid 2px;
`
// const fakeFetch = (delay = 1000) => new Promise(res => setTimeout(res(tradeDummy), delay));

const Component = ({fetcher, drawer}) => {

    const [list, setList] = useState([])

    /* initial fetch */
    useEffect(() => {
        (async () => {
            const data = await fetcher()
            const initComponents = drawer(data)
            setList(prev => ([...initComponents]))
        })()
    }, []);

    const [_, setRef] = useIntersect(async (entry, observer) => {
        observer.unobserve(entry.target);
        const nextData = await fetcher()
        const nextComponents = drawer(nextData)
        setList(prev => ( [...prev, ...nextComponents ] ))
        observer.observe(entry.target);
    }, {});

    return (
        <Container className={'hide-scroll'}>
            { list.map(value => value) }
            <div ref={setRef} />
        </Container>
    )
}

export default Component