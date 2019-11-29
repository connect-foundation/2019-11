import React, { useState } from "react"
import styled from "styled-components"
import NextButton from "./NextButton"
import BeforeButton from "./BeforeButton"
import CarouselImage from "./CarouselImage"
import AddButton from "./AddButton"

const Container = styled.div`
  width: 20em;
  height: 20em;
  box-sizing: border-box;
  background-color: #e0e0e0;
  position: relative;

  opacity: ${props => (props.dragOn ? 0.6 : 1)};
`

const LeftDiv = styled.div`
  position: absolute;
  display: flex;
  height: 100%;
  width: 2.5em;
  left: 0;
`

const Window = styled.div`
  width: 20em;
  height: 20em;
  box-sizing: border-box;
  overflow: hidden;
`

const Panel = styled.div`
  display: flex;
  width: 220em;
  height: 20em;
  transform: ${props => `translateX(calc(-20em * ${props.idx}))`};

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
  width: 20em;
  height: 20em;
`

const Components = ({ list, handler }) => {
  let onImageLoad = false
  let imageBuffer = []
  let onloadCount = 0
  let renderCount = 0
  const [showIdx, changeIdx] = useState(0)
  const [dragOn, setDragOn] = useState(false)

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
  }

  const imageOnLoad = files => {
    const supportedFilesTypes = ["image/jpeg", "image/png", "image/gif"]

    for (const file of files) {
      const { type } = file
      if (supportedFilesTypes.indexOf(type) > -1) {
        ++renderCount
        const render = new FileReader()
        render.onload = e => {
          ++onloadCount
          imageBuffer.push(e.target.result)
          imageOnLoadEnd()
        }
        render.readAsDataURL(file)
      }
    }
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
        <NextButton visible={showIdx !== list.length} onClick={handleRight} />
      </RightDiv>
      <Window>
        <Panel idx={showIdx}>
          {list.map((value, idx) => (
            <CarouselItem>
              <CarouselImage
                key={value}
                src={value}
                onRemove={() => {
                  list.splice(idx, 1)
                  handler([...list])
                }}
              />
            </CarouselItem>
          ))}
          <AddButton trigger={imageOnLoad} />
        </Panel>
      </Window>
    </Container>
  )
}

export default Components
