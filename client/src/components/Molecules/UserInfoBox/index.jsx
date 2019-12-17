import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import UserContext from "../../../context/UserContext";
import DefaultProfileIcon from "../../../assets/default-profile.svg";
import ModalContext from "../../../context/ModalContext";
import SignUpModal from "../CustomModal/SignUpModal";
import ReactTooltip from "react-tooltip";
import { postJsonFetch } from "../../../services/fetchService";
import apiConfig from "../../../config/api";
import pathConfig from "../../../config/path";

const { apiUrl } = apiConfig;
const { storage } = pathConfig;

const InfoDiv = styled.div`
  display: flex;
  flex-direction: column;
  font-family: "BMJUA";
  background-color: var(--color-gray-lighter);

  width: 100%;
  height: 100%;
`;
const ProfileWrap = styled.div`
  display: flex;
  margin: 1rem 0;
  justify-content: center;
  padding: 0;
`;

const ProfileBig = styled.div`
  display: flex;
  width: 7rem;
  height: 7em;
  overflow: hidden;
  background: white;
  border-radius: 50%;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  img {
    width: 100%;
    height: 100%;
    object-fit: contain;
    margin: 0;
  }
`;
const UserWrap = styled.div`
  display: flex;
  justify-content: space-between;

  margin: 1rem 0.2rem;
  border-bottom: solid 2px var(--color-gray-darker);
  height: 2rem;
`;

const ButtonWrap = styled.div`
  display: flex;
  flex-direction: column;

  flex-grow: 1;
`;
const Buttons = styled.button`
  all: unset;
  margin-bottom: 0.5rem;
  text-align: center;
  &:hover {
    background-color: var(--color-primary);
    color: white;
    cursor: pointer;
  }
`;
const StyledLink = styled(Link)`
  text-decoration: none;
  all: unset;
  margin-bottom: 0.5rem;
  text-align: center;
  &:hover {
    background-color: var(--color-primary);
    color: white;
    cursor: pointer;
  }
`;
const LogoutButtons = styled.button`
  all: unset;
  color: white;
  background-color: var(--color-danger-lighter);
  text-align: center;
  &:hover {
    cursor: pointer;
  }
`;

const ChangeImgButtonLabel = styled.label`
  display: inline-block;
  position: absolute;
  right: 1em;
  width: 1em;
  right: 1em;
  img {
    width: 1em;
    height: 1em;
    cursor: pointer;
  }
`;

const ChangeImgButton = styled.input`
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  border: 0;
`;

const ToolTip = styled(ReactTooltip)`
  font-family: "BMJUA";
`;

function Component(props) {
  const [user, setUser] = useContext(UserContext);
  const [, setModal] = useContext(ModalContext);
  const [token, setToken] = useState("");
  useEffect(() => {
    if (localStorage.getItem("access-token")) {
      setToken(localStorage.getItem("access-token"));
    }
  });
  const handleUpdateDone = () => {
    setModal(state => ({ ...state, isOpen: false }));
  };
  const handleLogoutClick = () => {
    localStorage.removeItem("access-token");
    localStorage.removeItem("refresh-token");
    setUser({});
    props.onClick();
  };
  const handleUpdateUserInfoClick = () => {
    setModal({
      isOpen: true,
      component: SignUpModal,
      message: "",
      props: { close: handleUpdateDone, isSignUp: false }
    });
  };

  const handleGetImage = e => {
    const { files } = e.target;
    const url = `${apiUrl}${storage.profile}`;
    const timestamp = new Date().toUTCString();
    const header = { "x-timestamp": timestamp };
    const imageHeader = Object.assign(header, { "x-auth": "user" });
    const fileReader = new FileReader();
    fileReader.readAsDataURL(files[0]);
    fileReader.onload = async e => {
      const img = e.target.result.split(",")[1];
      const result = await postJsonFetch(url, imageHeader, {
        id: user.id,
        uri: img
      });
      setUser(result);
    };
    e.preventDefault();
  };

  return (
    <InfoDiv>
      <ProfileWrap>
        <ProfileBig>
          <img
            src={user.profileUrl === (undefined || null) ? DefaultProfileIcon : user.profileUrl}
            alt={"Profile Image"}
          />
        </ProfileBig>

        {token.includes("kakao_") || token.includes("google_") ? (
          undefined
        ) : (
          <>
            <ChangeImgButtonLabel htmlFor="change-img" data-tip="프로필 이미지 변경">
              <img src="https://image.flaticon.com/icons/png/512/17/17789.png" />
            </ChangeImgButtonLabel>
            <ChangeImgButton
              id="change-img"
              type={"file"}
              accept=".jpg, .png"
              onChange={handleGetImage}
            />
            <ToolTip place="right" effect="solid" />
          </>
        )}
      </ProfileWrap>
      <UserWrap>
        <div>{user.name}님</div>
        <div>매너지수 : {user.mannerPoint}</div>
      </UserWrap>
      <ButtonWrap>
        {token.includes("kakao_") || token.includes("google_") ? (
          undefined
        ) : (
          <Buttons onClick={handleUpdateUserInfoClick}>회원정보수정 ></Buttons>
        )}
        <StyledLink to={`/register/`} onClick={props.onClick}>
          상품등록하기 >
        </StyledLink>
        <StyledLink to={`/tradelist/`} onClick={props.onClick}>
          거래내역조회 >
        </StyledLink>
        <StyledLink to={`/myItems/`} onClick={props.onClick}>
          경매중인 내 상품 >
        </StyledLink>
      </ButtonWrap>
      <LogoutButtons onClick={handleLogoutClick}>로그아웃</LogoutButtons>
    </InfoDiv>
  );
}

export default Component;
