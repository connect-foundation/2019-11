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
import MessengerIcon from "../../../assets/messenger.svg";
import detailCategoryList from "../../../data/detail-category-list";
import { Container, OriginWrapper, ListWrapper, Bar, List, DivisionLine } from "./CategoryBarStyle";
import userContext from "../../../context/UserContext";
import Messenger from "../../Messenger";
import apiConfig from "../../../config/api";
import pathConfig from "../../../config/path";
import { getFetch } from "../../../services/fetchService";
import Notify from "../../../assets/notify.svg";
const { apiUrl } = apiConfig;
const { users } = pathConfig;

const Components = () => {
  const [open, setOpen] = useState(false);
  const [loginOpen, setLoginOpen] = useState(false);
  const [selectIdx, setSelectIdx] = useState(1);
  const [user, setUser] = useContext(userContext);

  const node = useRef();

  useEffect(() => {
    document.addEventListener("mousedown", handleOnBlur);
    if (user.id === undefined) {
      const refreshToken = localStorage.getItem("refresh-token");
      const accessToken = localStorage.getItem("access-token");
      if (refreshToken !== null && accessToken !== null) {
        const headers = {
          "access-token": `${accessToken}`,
          "refresh-token": `${refreshToken}`
        };
        (async () => {
          const result = await getFetch(`${apiUrl}${users}`, headers, {});
          if (result) {
            setUser(result);
            localStorage.setItem("access-token", result.accessToken);
            localStorage.setItem("refresh-token", result.refreshToken);
          } else alert("세션이 만료되어 로그아웃됩니다.");
        })();
      }
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
    if (node.current !== (undefined || null)) {
      if (!node.current.contains(e.target)) {
        setOpen(false);
      }
    }
  };

  const close = () => {
    setOpen(false);
  };

  return (
    <Container ref={node}>
      <OriginWrapper>
        <Logo />
        <Bar>
          {user.isLogin === true ? (
            <Profile onClick={handleClick} idx={0} />
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
          {user.isLogin === true ? (
            <>
              <CategoryIcon
                color="#FFE1A2"
                img={Notify}
                text="알림"
                active={open}
                onClick={handleClick}
                idx={999}
              />
              <Messenger img={MessengerIcon} onClick={close} />
            </>
          ) : (
            undefined
          )}
        </Bar>
      </OriginWrapper>
      <ListWrapper open={open} idx={selectIdx}>
        <ExpandList
          open={open}
          idx={selectIdx}
          details={detailCategoryList[selectIdx - 1]}
          onClick={close}
        />
      </ListWrapper>
      <MainModal onClose={handleLoginClose} open={loginOpen} />
    </Container>
  );
};

export default Components;
