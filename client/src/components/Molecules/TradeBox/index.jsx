import React from 'react'
import styled from 'styled-components'

const Container = styled.div`
    display:flex;
    width: 100%;
    max-width: fit-content;
    height: 5rem;
    margin-bottom: 5px;
`

const Thumbnail = styled.img`
    width: 5rem;
    height: 5rem;
`

const Title = styled.span`
    display:flex;
    width: 25rem;
    height: fit-content;
    font-size: 1.5rem;
    margin: auto 0.5rem;
`

const Status = styled.span`
    min-width: 7rem;
    height: fit-content;
    font-size: 1.2rem;
    margin: auto 0.5rem;
    text-align: center;
    font-weight: 700;
`

const Price = styled.span`
    min-width: 10rem;
    height: fit-content;
    font-size: 1.2rem;
    margin: auto 0.5rem;
    text-align:end;
`

const Component = ({ title, thumbnail, status, price }) => {

    return (
        <Container>
            <Thumbnail src={thumbnail} />
            <Title>{title}</Title>
            <Status>{status}</Status>
            <Price>{price}원</Price>
        </Container>
    )
}

export default Component