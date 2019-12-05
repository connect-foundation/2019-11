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
  KakaoButton,
  GoogleButton
} from "./LoginDialogStyles";
import UserContext from "../../../context/UserContext";

const LoginDialog = ({ signUp, close }) => {
  const [id, setId] = useState("");
  const [pwd, setPwd] = useState("");
  const [user, setUser] = useContext(UserContext);

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
          setUser(user);
          localStorage.setItem("access-token", user.accessToken);
          localStorage.setItem("refresh-token", user.refreshToken);
          close();
        } else alert("아이디 또는 비밀번호가 일치하지 않습니다.");
      });
    e.preventDefault();
  };

  const onSuccessKakaoLogin = result => {
    const { profile, response } = result;
    const { id, kakao_account, properties } = profile;
    const { access_token, refresh_token } = response;
    const { nickname, profile_image } = properties;
    const { email } = kakao_account;

    fetch("http://localhost:3000/api/sign/kakao", {
      method: "POST",
      credentials: "include",
      headers: {
        "access-token": access_token,
        "refresh-token": refresh_token,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        id,
        name: nickname,
        email: email,
        profileUrl: profile_image
      })
    })
      .then(result => result.json())
      .then(async result => {
        const { msg, user } = result;
        if (msg) {
          console.log(user);
          setUser(user);
          localStorage.setItem("access-token", user.accessToken);
          localStorage.setItem("refresh-token", user.refreshToken);
          close();
        } else alert("카카오 로그인에 실패하였습니다.");
      });
  };

  const onSuccessGoogleLogin = result => {
    fetch("http://localhost:3000/api/sign/google", {
      method: "POST",
      headers: {
        "auth-code": `${result.code}`
      }
    })
      .then(result => result.json())
      .then(result => {
        const { msg, user } = result;
        if (msg) {
          console.log(user);
          setUser(user);
          localStorage.setItem("access-token", user.accessToken);
          localStorage.setItem("refresh-token", user.refreshToken);
          close();
        } else alert("구글 로그인에 실패하였습니다.");
      });
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
        <OAuthLoginButton color="#2DB400">네이버</OAuthLoginButton>
        <SignUpButton onClick={signUp}>회원가입</SignUpButton>
      </Footer>
    </DialogStyle>
  );
};

export default LoginDialog;
