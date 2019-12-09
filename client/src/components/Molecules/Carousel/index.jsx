import React, { useState } from "react"
import styled from "styled-components"
import NextButton from "./NextButton"
import BeforeButton from "./BeforeButton"
import CarouselImage from "./CarouselImage"
import AddButton from "./AddButton"

import LoddingImage from "../../../assets/loadding.gif"

import { limits, size } from "./constant"

const Container = styled.div`
  width: ${size}rem;
  height: ${size}rem;
  box-sizing: border-box;
  position: relative;

  opacity: ${props => (props.dragOn ? 0.6 : 1)};
`

const LeftDiv = styled.div`
  position: absolute;
  display: flex;
  height: 100%;
  width: 2.5rem;
  left: 0;
`

const Window = styled.div`
  width: ${size}rem;
  height: ${size}rem;
  box-sizing: border-box;
  overflow: hidden;
`

const Panel = styled.div`
  display: flex;
  width: ${size * 10}rem;
  height: ${size}rem;
  transform: ${props => `translateX(calc(-${size}rem * ${props.idx}))`};

  transition: transform 0.1s ease-in-out;
`

const RightDiv = styled.div`
  position: absolute;
  display: flex;
  width: 2.5em;
  height: 100%;
  right: 0;
`

const CarouselItem = styled.div`
  width: ${size}rem;
  height: ${size}rem;
`

const Lodding = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: ${size}rem;
  height: ${size}rem;
  z-index: 10;
  color: white;
  background: url(${LoddingImage}) center no-repeat;
`

const Components = ({ list, handler, readOnly }) => {
  let onImageLoad = false
  let imageBuffer = []
  let onloadCount = 0
  let renderCount = 0
  const [showIdx, changeIdx] = useState(0)
  const [dragOn, setDragOn] = useState(false)
  const [isLoadding, setIsLoadding] = useState(false)
  const [isFull, setIsFull] = useState(list.length >= 10)

  const handleLeft = event => {
    if (!onImageLoad) changeIdx(showIdx > 0 ? showIdx - 1 : 0)
  }
  const handleRight = event => {
    if (!onImageLoad) changeIdx(showIdx < list.length ? showIdx + 1 : list.length)
  }
  const handleDragOn = e => {
    setDragOn(true)
    e.preventDefault()
  }

  const handleDragLeave = e => {
    setDragOn(false)
    e.preventDefault()
  }

  const handleDragOver = e => {
    e.preventDefault()
  }

  const handleDrop = e => {
    const files = e.dataTransfer.files

    if (list.length + files.length <= 10) imageOnLoad(files)
    else alert("이미지는 최대 10개입니다.")

    setDragOn(false)
    e.preventDefault()
  }

  const imageOnLoadEnd = () => {
    if (onloadCount !== renderCount) return
    handler(prev => [...prev, ...imageBuffer])
    imageBuffer = []
    onloadCount = renderCount = 0
    setIsLoadding(false)
  }

  const imageOnLoad = files => {
    const supportedFilesTypes = ["image/jpeg", "image/png", "image/gif"]
    setIsLoadding(true)
    for (let idx = 0; idx < files.length; ++idx) {
      const { type } = files[idx]
      if (supportedFilesTypes.indexOf(type) > -1) {
        ++renderCount
        const render = new FileReader()
        render.onload = e => {
          ++onloadCount
          imageBuffer.push(e.target.result)
          imageOnLoadEnd()
        }
        render.readAsDataURL(files[idx])
      }
    }
    if (!renderCount) setIsLoadding(false)
  }

  return (
    <Container
      dragOn={dragOn}
      onDragOver={handleDragOver}
      onDragOver={handleDragOn}
      onDrop={handleDrop}
      onDragLeave={handleDragLeave}
    >
      <LeftDiv>
        <BeforeButton visible={showIdx !== 0} onClick={handleLeft} />
      </LeftDiv>
      <RightDiv>
        <NextButton visible={showIdx < list.length - !!readOnly} onClick={handleRight} />
      </RightDiv>
      <Window>
        <Panel idx={showIdx}>
          {list.map((value, idx) => (
            <CarouselItem>
              <CarouselImage
                key={value}
                src={value}
                readOnly={!!readOnly}
                onRemove={() => {
                  list.splice(idx, 1)
                  handler([...list])
                }}
              />
            </CarouselItem>
          ))}
          {readOnly | isFull ? undefined : <AddButton trigger={imageOnLoad} />}
        </Panel>
      </Window>
      {isLoadding ? <Lodding /> : undefined}
    </Container>
  )
}

export default Components
