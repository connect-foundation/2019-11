import React, { useState, useContext } from "react";
import styled, { css } from "styled-components";
import KakaoLogin from "react-kakao-login";
import GoogleLogin from "react-google-login";
import {
  ModalBody,
  Input,
  SubmitButton,
  ButtonContainer
} from "./UserModalCommonStyles";
import UserContext from "../../../context/UserContext";
import apiConfig from "../../../config/api";
import pathConfig from "../../../config/path";
import { postJsonFetch } from "../../../services/fetchService";
import ModalContext from "../../../context/ModalContext";
import SignUpModal from "./SignUpModal";
const { apiUrl } = apiConfig;
const { sign } = pathConfig;

const LoginBody = styled.div`
  background: white;
  padding: 1em 1em 0 1em;
`;

const InputContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  height: 6em;
`;

const DivisionLine = styled.hr`
  border: 2px solid;
  border-radius: 2px;
  width: 80%;
`;

const Footer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding-bottom: 0.5em;
`;

const FooterButtonStyle = css`
  display: flex;
  justify-content: center;
  width: 80%;
  margin-bottom: 0.5em;
  font-family: "BMJUA";
  box-shadow: 1px 2px 3px rgba(0, 0, 0, 0.1);
  padding: 1em;
  border-radius: 3px;
`;

const GoogleButton = styled(GoogleLogin)`
  ${FooterButtonStyle}
  background: white;
  div {
    display: none;
  }
  span {
    font-family: "BMJUA";
    color: black;
  }
`;

const KakaoButton = styled(KakaoLogin)`
  ${FooterButtonStyle}
  background: var(--color-secondary-plus1-lighter);
`;

const SignUpButton = styled.button`
  ${FooterButtonStyle}
  color: white;
  background: var(--color-quaternary);
`;

const LoginModal = ({ close }) => {
  const [id, setId] = useState("");
  const [pwd, setPwd] = useState("");
  const [, setUser] = useContext(UserContext);
  const [, setModal] = useContext(ModalContext);
  const handleSubmit = async e => {
    e.preventDefault();
    if (id === "" || pwd === "") alert("필수 정보가 입력되지 않았습니다.");
    else {
      const body = {
        username: id,
        password: pwd
      };
      const res = await postJsonFetch(`${apiUrl}${sign.in}`, {}, body);
      const { msg, user } = res;
      if (msg) {
        setUser(user);
        localStorage.setItem("access-token", user.accessToken);
        localStorage.setItem("refresh-token", user.refreshToken);
        close();
      } else alert("아이디 또는 비밀번호가 일치하지 않습니다.");
    }
  };
  const onSuccessKakaoLogin = async result => {
    const { profile, response } = result;
    const { id, kakao_account, properties } = profile;
    const { access_token, refresh_token } = response;
    const { nickname, profile_image } = properties;
    const { email } = kakao_account;
    const body = {
      id,
      name: nickname,
      email: email,
      profileUrl: profile_image
    };
    const headers = {
      "access-token": access_token,
      "refresh-token": refresh_token,
      "Content-Type": "application/json"
    };
    const res = await postJsonFetch(`${apiUrl}${sign.kakao}`, headers, body);
    const { msg, user } = res;
    if (msg) {
      setUser({ ...user, isSnsLogin: true });
      localStorage.setItem("access-token", user.accessToken);
      localStorage.setItem("refresh-token", user.refreshToken);
      close();
    } else alert("카카오 로그인에 실패하였습니다.");
  };
  const onSuccessGoogleLogin = async result => {
    const response = await postJsonFetch(
      `${apiUrl}${sign.google}`,
      { "auth-code": result.code },
      {}
    );
    const { msg, user } = response;
    if (msg) {
      setUser({ ...user, isSnsLogin: true });
      localStorage.setItem("access-token", user.accessToken);
      localStorage.setItem("refresh-token", user.refreshToken);
      close();
    } else alert("구글 로그인에 실패하였습니다.");
  };
  const handleKeyUpId = e => {
    setId(e.target.value);
  };
  const handleKeyUpPwd = e => {
    setPwd(e.target.value);
  };

  const handleSignUpClick = () => {
    setModal({
      isOpen: true,
      component: SignUpModal,
      message: "",
      props: { close, isSignUp: true }
    });
  };

  return (
    <ModalBody>
      <LoginBody>
        <InputContainer>
          <Input
            type="text"
            name="username"
            placeholder="ID"
            onKeyUp={handleKeyUpId}
          />
          <Input
            type="password"
            name="password"
            placeholder="PASSWORD"
            onKeyUp={handleKeyUpPwd}
          />
        </InputContainer>
        <ButtonContainer>
          <SubmitButton onClick={handleSubmit} type="submit">
            로그인
          </SubmitButton>
        </ButtonContainer>
      </LoginBody>
      <DivisionLine />
      <Footer>
        <GoogleButton
          clientId={process.env.REACT_APP_GOOGLE_KEY}
          buttonText={"구글"}
          onSuccess={onSuccessGoogleLogin}
          onFailure={result => console.log(result)}
          responseType={"code"}
          accessType={"offline"}
          prompt={"consent"}
        />
        <KakaoButton
          jsKey={process.env.REACT_APP_KAKAO_KEY}
          onSuccess={onSuccessKakaoLogin}
          onFailure={result => console.log(result)}
          getProfile="true"
          buttonText="카카오"
        />
        <SignUpButton onClick={handleSignUpClick}>회원가입</SignUpButton>
      </Footer>
    </ModalBody>
  );
};
export default LoginModal;
