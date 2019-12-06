import React, { useContext } from "react"
import { Link } from "react-router-dom"
import styled from "styled-components"
import userContext from "../../../context/UserContext"
import DefaultProfileIcon from "../../../assets/default-profile.svg"

const InfoDiv = styled.div`
  position: absolute;
  left: 6rem;
  top: 1rem;

  display: flex;
  flex-direction: column;
  background-color: var(--color-secondary-minus1);

  width: ${props => (props.isShow ? "15" : 0)}rem;
  height: 20rem;

  overflow: hidden;
  z-index: 30;

  border-radius: 5px;
  transition: all 0.3s ease-in-out;
`
const ProfileWrap = styled.div`
  display: flex;
  margin: 1rem 0;
  justify-content: center;
`

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
`
const UserWrap = styled.div`
  display: flex;
  justify-content: space-between;

  margin: 1rem 0.2rem;
  height: 2rem;
`
const ButtonWrap = styled.div`
  display: flex;
  flex-direction: column;

  flex-grow: 1;
`
const Buttons = styled.button`
  all: unset;
  margin-buttom: 0.5rem;
  text-align: center;
  &:hover {
    background-color: var(--color-secondary-plus0);
    color: white;
    cursor: pointer;
  }
`
const LogoutButtons = styled.button`
  all: unset;
  color: white;
  background-color: var(--color-danger-lighter);
  text-align: center;
  &:hover {
    cursor: pointer;
  }
`
const StyledLink = styled(Link)`
  text-decoration: none;
  all: unset;
  margin-buttom: 0.5rem;
  text-align: center;
  &:hover {
    background-color: var(--color-secondary-plus0);
    color: white;
    cursor: pointer;
  }
`
function Component(props) {
  const [user, setUser] = useContext(userContext)
  const handleLogoutClick = () => {
    localStorage.removeItem("access-token")
    localStorage.removeItem("refresh-token")
    setUser({})
  }
  console.log(user)
  return (
    <div>
      <InfoDiv isShow={props.isShow}>
        <ProfileWrap>
          <ProfileBig>
            <img
              src={user.profileUrl === (undefined || null) ? DefaultProfileIcon : user.profileUrl}
            />
          </ProfileBig>
        </ProfileWrap>
        <UserWrap>
          <div>{user.name}님</div>
          <div>매너지수 : {user.mannerPoint}</div>
        </UserWrap>
        <ButtonWrap>
          <Buttons>회원정보수정 ></Buttons>
          <StyledLink to={`/tradelist/`} onClick={props.onClick}>
            거래내역조회 >
          </StyledLink>
        </ButtonWrap>
        <LogoutButtons onClick={handleLogoutClick}>로그아웃</LogoutButtons>
      </InfoDiv>
    </div>
  )
}

export default Component
