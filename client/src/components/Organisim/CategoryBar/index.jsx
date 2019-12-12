import React, { useState, useRef, useEffect, useContext } from "react";
import styled from "styled-components";

import Logo from "./Logo";
import CategoryIcon from "./CategoryIcon";
import ExpandList from "./ExpandList";
import LoginButton from "./LoginButton";
import Profile from "./Profile";
import Cloth from "../../../assets/cloth.svg";
import Electronic from "../../../assets/television.svg";
import LifeStyle from "../../../assets/geek.svg";
import MessengerIcon from "../../../assets/messenger.svg";
import detailCategoryList from "../../../data/detail-category-list";
import UserContext from "../../../context/UserContext";
import Messenger from "../../Messenger";
import apiConfig from "../../../config/api";
import pathConfig from "../../../config/path";
import { getFetch } from "../../../services/fetchService";
import Notify from "../../../assets/notify.svg";
import ModalContext from "../../../context/ModalContext";
import LoginModal from "../../Molecules/CustomModal/LoginModal";

const Container = styled.div`
  display: flex;
  position: relative;
`;

const OriginWrapper = styled.div`
  width: 5rem;
  display: flex;
  flex-direction: column;
  z-index: 2;
  background: var(--color-tertiary-darker);
`;

const ListWrapper = styled.div`
  position: absolute;
  width: ${props => (props.open ? (props.idx === "999" ? 20 : 15) : 0)}rem;
  height: 100%;
  left: ${WIDTH}em;
  z-index: 999;

  overflow: hidden;
  transition: width 0.35s ease-in-out;
`;

const Bar = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  width: 100%;
  overflow-y: auto;
  box-sizing: border-box;
  padding: 0.5em 1em;
`;

const List = styled.ul`
  flex-grow: 1;
  list-style: none;
  padding: 0;
  margin: 0;
`;
const DivisionLine = styled.hr`
  width: 100%;
  border-top: 1px solid var(--color-quaternary);
  border-left: none;
`;

const { apiUrl } = apiConfig;
const { users } = pathConfig;

const Components = () => {
  const [open, setOpen] = useState(false);
  const [selectIdx, setSelectIdx] = useState(1);
  const [user, setUser] = useContext(UserContext);
  const [, setModal] = useContext(ModalContext);

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

  const handleUpdateDone = () => {
    setModal(state => ({ ...state, isOpen: false }));
  };

  const handleLoginClick = () => {
    setModal({
      isOpen: true,
      component: LoginModal,
      message: "",
      props: { close: handleUpdateDone }
    });
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
    </Container>
  );
};

export default Components;
