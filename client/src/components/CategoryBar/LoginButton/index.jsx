import React from 'react'
import styled from 'styled-components'

const LoginButtonStyle = styled.button`
  font-family: 'BMJUA';
  width: 100%;
  height: 3.5em;
  border-radius: 20%;
  background: #5C5749;
  color: white;

  transition: all .2s ease-in-out;

  &:hover {
    color: #5C5749;
    background: white;
  }
`;

const LoginButton = ({onClick}) => {
  return (
    <LoginButtonStyle onClick={onClick}>로그인</LoginButtonStyle>
  )
}

export default LoginButton;