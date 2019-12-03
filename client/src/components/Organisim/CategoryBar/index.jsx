import React, { useState, useRef, useEffect, useContext } from "react";
import Logo from "./Logo";
import CategoryIcon from "./CategoryIcon";
import ExpandList from "./ExpandList";
import LoginButton from "./LoginButton";
import Profile from "./Profile";
import MainModal from "../../Molecules/MainModal";

import Cloth from "../../../assets/cloth.svg";
import Electronic from "../../../assets/television.svg";
import LifeStyle from "../../../assets/geek.svg";

import detailCategoryList from "../../../data/detail-category-list";

import {
  Container,
  OriginWrapper,
  ListWrapper,
  Bar,
  List,
  DivisionLine
} from "./CategoryBarStyle";

import userContext from "../../../context/UserContext";

const Components = () => {
  const [open, setOpen] = useState(false);
  const [loginOpen, setLoginOpen] = useState(false);
  const [isLogin, setIsLogin] = useState(false);
  const [selectIdx, setSelectIdx] = useState(1);

  const userInfo = useContext(userContext);

  const node = useRef();

  useEffect(async () => {
    document.addEventListener("mousedown", handleOnBlur);
    await fetch("http://localhost:3000/api/users/", {
      method: "GET",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
        "access-token": `${localStorage.getItem("access-token")}`,
        "refresh-token": `${localStorage.getItem("refresh-token")}`
      }
    })
      .then(result => result.json())
      .then(result => {
        if (result) {
          userInfo.id = result.id;
          userInfo.username = result.loginId;
          userInfo.name = result.name;
          userInfo.email = result.email;
        } else alert("세션이 만료되어 로그아웃됩니다.");
      });
    if (userInfo.id !== undefined) {
      setIsLogin(true);
    }
  }, []);

  const handleClick = e => {
    const { idx } = e.target.dataset;
    if (selectIdx === idx || open === false) {
      setOpen(!open);
    }
    setSelectIdx(idx);
  };

  const handleLoginClick = () => {
    setLoginOpen(!loginOpen);
  };

  const handleLoginClose = () => {
    loginOpen === true && setLoginOpen(!loginOpen);
  };

  const handleOnBlur = e => {
    if (!node.current.contains(e.target)) {
      setOpen(false);
    }
  };

  const setLoginStatus = () => {
    setIsLogin(!isLogin);
  };

  const handleClickProfile = () => {
    fetch("http://localhost:3000/api/sign/check").then(result => alert(result));
  };

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
        <ExpandList
          open={open}
          idx={selectIdx}
          details={detailCategoryList[selectIdx - 1]}
        />
      </ListWrapper>
      <MainModal
        onClose={handleLoginClose}
        open={loginOpen}
        login={setLoginStatus}
      />
    </Container>
  );
};

export default Components;
