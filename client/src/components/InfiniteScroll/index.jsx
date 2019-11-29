import React, { useEffect, useState } from "react"
import styled from "styled-components"
import useIntersect from "./useIntersect"
import loaddingGIF from "../../assets/loadding.gif"
import NotFoundImage from "../../assets/notFound.png"

const Container = styled.div`
  position: relative;
  width: 100%;
  min-height: 100%;
  display: flex;
  flex-direction: column;
`

const Loadding = styled.div`
  position: absolute;
  z-index: 1;
  width: 100%;
  height: 100%;
  background: ${props => `url(${props.src})`} center no-repeat;
`

const NotFoundDiv = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`

const NotFoundSpan = styled.span`
  font-weight: "BMJUA";
  font-size: 1rem;
  font-weight: bold;
`

const renderNotFound = () => {
  return (
    <NotFoundDiv>
      <img src={NotFoundImage} />
      <NotFoundSpan>검색 기록이 없습니다 ㅠㅠ</NotFoundSpan>
    </NotFoundDiv>
  )
}

const Component = ({ fetcher, drawer, reset }) => {
  const [loadding, setLoadding] = useState(true)
  const [list, setList] = useState([])

  useEffect(() => {
    ;(async () => {
      const data = await fetcher()
      const initComponents = drawer(data)
      setLoadding(false)
      setList(prev => [...initComponents])
    })()
  }, [reset])

  const [_, setRef] = useIntersect(async (entry, observer) => {
    observer.unobserve(entry.target)

    const nextData = await fetcher()
    const nextComponents = drawer(nextData)
    setList(prev => [...prev, ...nextComponents])

    if (nextData.length) observer.observe(entry.target)
  }, {})

  return (
    <Container className={"hide-scroll"}>
      {loadding ? (
        <Loadding src={loaddingGIF} />
      ) : list.length ? (
        list.map(value => value)
      ) : (
        renderNotFound()
      )}
      <div ref={setRef} />
    </Container>
  )
}

export default Component
