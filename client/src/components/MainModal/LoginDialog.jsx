import React, { useState } from "react";
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
  SignUpButton
} from "./LoginDialogStyles";

const LoginDialog = ({ signUp, login, close }) => {
  const [id, setId] = useState("");
  const [pwd, setPwd] = useState("");

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
      .then(result => {
        if (result.msg) {
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
        <OAuthLoginButton color="yellow">카카오</OAuthLoginButton>
        <OAuthLoginButton color="#2DB400">네이버</OAuthLoginButton>
        <SignUpButton onClick={signUp}>회원가입</SignUpButton>
      </Footer>
    </DialogStyle>
  );
};

export default LoginDialog;
