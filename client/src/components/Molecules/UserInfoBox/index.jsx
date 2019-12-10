import React, { useContext } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import userContext from "../../../context/UserContext";
import DefaultProfileIcon from "../../../assets/default-profile.svg";

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

function Component(props) {
  const [user, setUser] = useContext(userContext);
  const handleLogoutClick = () => {
    localStorage.removeItem("access-token");
    localStorage.removeItem("refresh-token");
    setUser({});
    props.onClick();
  };
  return (
    <InfoDiv>
      <ProfileWrap>
        <ProfileBig>
          <img
            src={
              user.profileUrl === (undefined || null)
                ? DefaultProfileIcon
                : user.profileUrl
            }
          />
        </ProfileBig>
      </ProfileWrap>
      <UserWrap>
        <div>{user.name}님</div>
        <div>매너지수 : {user.mannerPoint}</div>
      </UserWrap>
      <ButtonWrap>
        <Buttons>회원정보수정 ></Buttons>
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
