import React, { useState, useRef, useEffect, useContext } from "react";
import styled from "styled-components";

import Logo from "./Logo";
import CategoryIcon from "./CategoryIcon";
import ExpandList from "./ExpandList";
import LoginButton from "./LoginButton";
import Profile from "./Profile";
import MessengerIcon from "../../../assets/messenger.svg";
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
  width: ${props => (props.open ? (props.idx === 999 ? "21" : "15") : 0)}rem;
  height: 100%;
  left: 5em;
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
const { users, statics } = pathConfig;

const Components = () => {
  const [open, setOpen] = useState(false);
  const [selectIdx, setSelectIdx] = useState(1);
  const [user, setUser] = useContext(UserContext);
  const [, setModal] = useContext(ModalContext);
  const [categoryList, setCategoryList] = useState([]);

  const node = useRef();

  const getCategoryList = async () => {
    const result = await getFetch(`${apiUrl}${statics.categories}`, {}, {});
    setCategoryList(result);
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleOnBlur);
    getCategoryList();
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
          } else {
            alert("세션이 만료되어 로그아웃됩니다.");
            localStorage.removeItem("access-token");
            localStorage.removeItem("refresh-token");
          }
        })();
      }
    }
  }, []);

  const handleClick = e => {
    const { idx } = e.target.dataset;
    if (selectIdx === Number(idx) || open === false) {
      setOpen(!open);
    }
    setSelectIdx(Number(idx));
    e.preventDefault();
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
            {categoryList.length > 0 &&
              categoryList.map((item, index) => (
                <CategoryIcon
                  color={item.color}
                  img={item.imageUrl}
                  text={item.name}
                  active={open}
                  onClick={handleClick}
                  idx={index + 1}
                />
              ))}
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
        {categoryList.length > 0 && (
          <ExpandList
            open={open}
            idx={selectIdx}
            details={selectIdx === 0 || selectIdx === 999 ? [] : categoryList[selectIdx - 1].sub}
            onClick={close}
          />
        )}
      </ListWrapper>
    </Container>
  );
};

export default Components;
