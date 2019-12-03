import React, { useState, useContext } from "react";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import {
  DialogStyle,
  InputContainer,
  Input,
  SubmitButton,
  DivisionLine,
  Footer,
  OAuthLoginButton,
  SignUpButton,
  KakaoButton
} from "./LoginDialogStyles";
import UserContext from "../../../context/UserContext";

const LoginDialog = ({ signUp, login, close }) => {
  const [id, setId] = useState("");
  const [pwd, setPwd] = useState("");
  const userInfo = useContext(UserContext);

  const handleSubmit = e => {
    fetch("http://localhost:3000/api/sign/login", {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        username: id,
        password: pwd
      })
    })
      .then(result => result.json())
      .then(async result => {
        const { msg, user } = result;
        if (msg) {
          userInfo.id = user.id;
          userInfo.username = user.loginId;
          userInfo.name = user.name;
          userInfo.email = user.email;
          await localStorage.setItem("access-token", user.accessToken);
          await localStorage.setItem("refresh-token", user.refreshToken);
          close();
          login();
        } else alert("아이디 또는 비밀번호가 일치하지 않습니다.");
      });
    e.preventDefault();
  };

  const handleKeyUpId = e => {
    setId(e.target.value);
  };

  const handleKeyUpPwd = e => {
    setPwd(e.target.value);
  };

  return (
    <DialogStyle>
      <form action="#" onSubmit={handleSubmit}>
        <DialogContent>
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
        </DialogContent>
        <DialogActions>
          <SubmitButton type="submit">로그인</SubmitButton>
        </DialogActions>
      </form>
      <DivisionLine />
      <Footer>
        <OAuthLoginButton color="white">구글</OAuthLoginButton>
        <KakaoButton
          jsKey="3e60e52d3ff296f46273d8da0462dc40"
          onSuccess={result => console.log(result)}
          onFailure={result => console.log(result)}
          getProfile="true"
          buttonText="카카오"
        />
        <OAuthLoginButton color="#2DB400">네이버</OAuthLoginButton>
        <SignUpButton onClick={signUp}>회원가입</SignUpButton>
      </Footer>
    </DialogStyle>
  );
};

export default LoginDialog;
