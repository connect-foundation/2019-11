import React, { useState, useRef, useEffect } from "react"
import Logo from "./Logo"
import CategoryIcon from "./CategoryIcon"
import ExpandList from "./ExpandList"
import LoginButton from "./LoginButton"
import Profile from "./Profile"
import MainModal from "../../Molecules/MainModal"

import Cloth from "../../../assets/cloth.svg"
import Electronic from "../../../assets/television.svg"
import LifeStyle from "../../../assets/geek.svg"

import detailCategoryList from "../../../data/detail-category-list"

import { Container, OriginWrapper, ListWrapper, Bar, List, DivisionLine } from "./CategoryBarStyle"

const Components = () => {
  const [open, setOpen] = useState(false)
  const [loginOpen, setLoginOpen] = useState(false)
  const [isLogin, setIsLogin] = useState(false)
  const [selectIdx, setSelectIdx] = useState(1)

  const node = useRef()

  useEffect(() => {
    document.addEventListener("mousedown", handleOnBlur)
  }, [])

  const handleClick = e => {
    const { idx } = e.target.dataset
    if (selectIdx === idx || open === false) {
      setOpen(!open)
    }
    setSelectIdx(idx)
  }

  const handleLoginClick = () => {
    setLoginOpen(!loginOpen)
  }

  const handleLoginClose = () => {
    loginOpen === true && setLoginOpen(!loginOpen)
  }

  const handleOnBlur = e => {
    if (!node.current.contains(e.target)) {
      setOpen(false)
    }
  }

  const setLoginStatus = () => {
    setIsLogin(!isLogin)
  }

  const handleClickProfile = () => {
    fetch("http://localhost:3000/api/sign/check").then(result => alert(result))
  }

  return (
    <Container ref={node}>
      <OriginWrapper>
        <Logo />
        <Bar>
          {isLogin === true ? (
            <Profile onClick={handleClickProfile} logout={setLoginStatus} />
          ) : (
            <LoginButton onClick={handleLoginClick} />
          )}
          <DivisionLine />
          <List>
            <CategoryIcon
              color="#FFE1A2"
              img={Cloth}
              text="의류"
              active={open}
              onClick={handleClick}
              idx={1}
            />
            <CategoryIcon
              color="#BEDDBF"
              img={Electronic}
              text="가전"
              active={open}
              onClick={handleClick}
              idx={2}
            />
            <CategoryIcon
              color="#5C5749"
              img={LifeStyle}
              text="생활"
              active={open}
              onClick={handleClick}
              idx={3}
            />
          </List>
        </Bar>
      </OriginWrapper>
      <ListWrapper open={open}>
        <ExpandList open={open} idx={selectIdx} details={detailCategoryList[selectIdx - 1]} />
      </ListWrapper>
      <MainModal onClose={handleLoginClose} open={loginOpen} login={setLoginStatus} />
    </Container>
  )
}

export default Components
