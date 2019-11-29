import React, { useState } from "react";
import styled from "styled-components";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import { DialogStyle, Input, SubmitButton } from "./LoginDialogStyles";

const InputContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  height: 20em;
`;

const Label = styled.label`
  font-size: small;
  font-family: "BMJUA";
`;

const SignUpDialog = ({ close, login }) => {
  const [id, setId] = useState("");
  const [password, setPassword] = useState("");
  const [checkPwd, setCheckPwd] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  const handleIdKeyUp = e => {
    setId(e.target.value);
  };

  const handlePasswordKeyUp = e => {
    setPassword(e.target.value);
  };

  const handleCheckPwdKeyUp = e => {
    setCheckPwd(e.target.value);
  };

  const handleNameKeyUp = e => {
    setName(e.target.value);
  };

  const handleEmailKeyUp = e => {
    setEmail(e.target.value);
  };

  const handleSubmit = e => {
    fetch("http://localhost:3000/api/users", {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        id,
        password,
        name,
        email
      })
    }).then(result => {
      if (result) {
        alert("회원가입 완료");
        login();
      } else {
        alert("회원가입에 실패하였습니다.");
      }
      close();
    });
    e.preventDefault();
  };

  return (
    <DialogStyle>
      <form action="#" onSubmit={handleSubmit}>
        <DialogContent>
          <InputContainer>
            <Label>아이디</Label>
            <Input
              type="text"
              name="id"
              placeholder="ID"
              onKeyUp={handleIdKeyUp}
            />
            <Label>비밀번호</Label>
            <Input
              type="password"
              name="password"
              placeholder="PASSWORD"
              onKeyUp={handlePasswordKeyUp}
            />
            <Label>비밀번호 재입력</Label>
            <Input
              type="password"
              name="check-password"
              placeholder="Retype PASSWORD"
              onKeyUp={handleCheckPwdKeyUp}
            />
            <Label>이름</Label>
            <Input
              type="text"
              name="name"
              placeholder="NAME"
              onKeyUp={handleNameKeyUp}
            />
            <Label>이메일</Label>
            <Input
              type="email"
              name="email"
              placeholder="E-MAIL"
              onKeyUp={handleEmailKeyUp}
            />
          </InputContainer>
        </DialogContent>
        <DialogActions>
          <SubmitButton type="submit">가입하기</SubmitButton>
        </DialogActions>
      </form>
    </DialogStyle>
  );
};

export default SignUpDialog;
