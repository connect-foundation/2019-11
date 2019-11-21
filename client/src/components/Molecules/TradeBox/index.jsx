import React, { useState } from 'react'
import styled from 'styled-components'

const Container = styled.div`
    display:flex;
    width: 32rem;
    box-sizing: border-box;
    height: 10rem;
    padding: 1rem;
    justify-content:space-between;
    background-color: ${props => props.ok ?  'rgba(92,184,92,0.2)': 'rgba(215,83,80,0.2)'};
    border: ${props => props.ok ? 'rgb(102,204,102)' : 'rgb(215,83,80)' } solid 2px;
`

const Thumbnail = styled.img`
    width: 8rem;
    height: 8rem;
`

const InfoDiv = styled.div`
    width: 21rem;
    height: 8rem;
    display:flex;
    flex-direction: column;
`

const TitleDiv = styled.div`
    display: flex;
    width: 100%;
    padding: 0 0.5rem;
    box-sizing: border-box;
`

const DueDiv = styled.div`
    display: flex;
    width: 100%;
    justify-content: space-between;
    box-sizing: border-box;
    padding: 10px 5px;
    align-items: center;
`

const PriceDiv = styled.div`
    display: flex;
    flex-direction: row-reverse;
    width: 100%;
    margin-top: 15px;
    align-items: center;
`

const Title = styled.span`
    font-family: 'BMJUA';
    font-size: 1.7rem;
`

const Status = styled.span`
    color: black;
    font-size: 1.2rem;
`

const Due = styled.span`
    color: #6f6f6f;
    font-size: 1rem;
`

const TradePrice = styled.span`
    color: black;
    margin-left: 5px;
    font-size:1.2rem;
`

const Percent = styled.span`
    color: ${props => props.up ? '#339933' : '#ff3030'};
    font-weight:bold;
    font-size: 1.1rem;
    margin-left: 5px;
`

const PriceDiff = styled.span`
    opacity: ${props => props.show ? '1' : '0'};
    font-size: 0.9rem;
    color: #6f6f6f;
    transition: opacity .15s ease-in-out;
`

const Component = (props) => {

    const { isOk, title, due, status, price, percent, diff } = props

    const [show, setShow] = useState(false);
    const handleDiff = e => setShow(!show);

    return (
        <Container ok={isOk}>
            <Thumbnail />
            <InfoDiv>
                <TitleDiv>
                    <Title>{title}</Title>
                </TitleDiv>
                <DueDiv>
                    <Status status={2}>{status}</Status>
                    <Due>{due}</Due>
                </DueDiv>
                <PriceDiv>
                    <TradePrice>{price}원</TradePrice>
                    { percent ? <Percent up={percent < 0} onMouseEnter={handleDiff} onMouseOut={handleDiff}>{Math.abs(percent) + '%'}</Percent> : undefined } 
                    { diff ? <PriceDiff show={show}>{diff}</PriceDiff> : undefined }
                </PriceDiv>
            </InfoDiv>
        </Container>
    )
}

export default Component