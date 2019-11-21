import React, { useState } from 'react'
import styled from 'styled-components'

import PageBase from '../../../../components/PageBase'
import Button from '../../../../components/BoxButton'
import Carousel from '../../../../components/Molecules/Carousel'
import InputBox from '../../../../components/InputBox'
import MoneyBox from '../../../../components/Molecules/MoneyBox'
import ItemDescription from '../../../../components/ItemDescription'
import TermSelector from '../../../../components/RegisterTermSelector'
import ToggleButton from '../../../../components/Atoms/ToggleButton'

import { termList, itemDescription } from '../../constants'
import { idxNotSelected, isArrayEmpty, strEmpty } from '../../../../utils/validator.js'

const ContentDiv = styled.div`
    width:80%;
    margin: 0 auto;
`

const ButtonContainer = styled.div`
    width: 100%;
    display:flex;
    justify-content:flex-end;
    margin-bottom: 1rem;
`

const TopContentDiv = styled.div`
  width:100%;
  height: 23rem;
  display:flex;
  justify-content: space-between; 
  margin-bottom: 2rem;
`

const CarouselDiv = styled.div`
    width: 23rem;
    height: 100%;
    display:flex;
    align-items:center;
    justify-content:center;
    box-sizing: border-box;
    border-radius: 10px;
    border: #dfdfdf solid 1px;
`

const InputDiv = styled.div`
    display:flex;
    flex-direction: column;
    align-items: flex-end;
    width: calc(100% - 20rem);
    max-width: 30rem;
    height: 100%;
    font-family: 'BMJUA';
`

const MoneyDiv = styled.div`
    width: 17.5rem;
    display: flex;
    height: fit-content;
    flex-direction: column;
    margin: 0.25rem 0;
`

const ItemTitle = styled.span`
    text-align:left;
    font-size: 1.1rem;
    font-weight: 500;
`

const ItemDesc = styled.span`
    text-align: left;
    font-size: 0.78rem;
`

const SelectorDiv = styled.div`
    width: 15rem;
    margin: 0.5rem 0;
`

const AuctionDiv = styled.div`
    display:flex;
    width: 15rem;
    height: 2rem;
    justify-content: space-between;
    align-items:center;
`

const renderItemDescription = (idx, focusIdx) => {
    if (idx === focusIdx)
        return <ItemDesc>{itemDescription[idx]}</ItemDesc>
}

const generateDayList = () => {
    const endDates = []

    return [
        termList.map((value) => {
            const { title, term } = value
            const deadline = new Date(); deadline.setDate(deadline.getDate() + term)
            const endDate = `${deadline.getFullYear()}.${deadline.getMonth() + 1}.${deadline.getDate()} ${deadline.getHours()}시 종료`

            endDates.push(endDate)
            return title
        })
        ,
        endDates
    ]
}

const validation = (result ,successCallback, failCallback) => {
    const isInvalid = result.some(value => value)
    isInvalid ? failCallback() : successCallback()
}

const Component = (props) => {
    const { width, next, obj } = props
    const dayList = generateDayList()

    const [title, setTitle] = useState(obj.title)
    const [description, setDescription] = useState(obj.description)
    const [buyNow, setBuyNow] = useState(obj.buyNow)
    const [minPrice, setMinPrice] = useState(obj.minPrice)
    const [predictPrice, setPredictPrice] = useState(obj.predictPrice)
    const [dayIdx, setDayIdx] = useState(-1)
    const [focusItem, setFocus] = useState(-1)
    const [isAuction, setIsAuction] = useState(true)

    const handleAuction = ev => setIsAuction(!isAuction)

    const valiResult = [strEmpty(title), idxNotSelected(dayIdx), strEmpty(buyNow), 
        isAuction && strEmpty(minPrice), isAuction && strEmpty(predictPrice), strEmpty(description)]

    const successCallback = () =>{
        next()
    }

    const failCallback = () => {
        alert('이미지가 등록되지 않거나, 빈 값이 있습니다.')
    }

    return (
        <PageBase width={width}>
            <ContentDiv>
                <TopContentDiv>
                    <CarouselDiv>
                        <Carousel />
                    </CarouselDiv>
                    <InputDiv onBlur={event => { setFocus(-1) }}>
                        <InputBox font={1.25} placeholder={'상품 제목'} value={title} onChange={ev => { setTitle(ev.target.value) }}/>
                        <SelectorDiv>
                            <TermSelector title={'경매 기간'} data={dayList} selected={dayIdx} handler={setDayIdx} />
                        </SelectorDiv>
                        <AuctionDiv>
                            <ItemTitle>경매</ItemTitle>
                            <ToggleButton checked={isAuction} onClick={handleAuction}/>
                        </AuctionDiv>
                        <MoneyDiv onFocus={ev => { setFocus(0) }}>
                            <ItemTitle>즉시 구매가</ItemTitle>
                            <MoneyBox money={buyNow} handler={setBuyNow}/>
                            {renderItemDescription(0, focusItem)}
                        </MoneyDiv>
                        {
                            (() => {
                                if (isAuction) return (
                                        <>
                                            <MoneyDiv onFocus={ev => { setFocus(1) }}>
                                                <ItemTitle>경매 시작가</ItemTitle>
                                                <MoneyBox money={minPrice} handler={setMinPrice}/>
                                                {renderItemDescription(1, focusItem)}
                                            </MoneyDiv>
                                            <MoneyDiv onFocus={ev => { setFocus(2) }}>
                                                <ItemTitle>낙찰 예상가</ItemTitle>
                                                <MoneyBox money={predictPrice} handler={setPredictPrice}/>
                                                {renderItemDescription(2, focusItem)}
                                            </MoneyDiv>
                                        </>
                                    )
                            })()
                        }
                        
                    </InputDiv>
                </TopContentDiv>
                <ItemDescription title={'상품 설명'} content={description} handler={setDescription} maxLen={500}  />
                <ButtonContainer>
                    <Button onClick={ev => validation(valiResult, successCallback, failCallback)} text={'등록'} />
                </ButtonContainer>
            </ContentDiv>
        </PageBase>
    )
}

export default Component