import React from 'react';
import styled from 'styled-components';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import { DialogStyle,
         Input,
         SubmitButton
        } from './LoginDialogStyles'

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

const SignUpDialog = () => {
  return (
    <DialogStyle>
      <DialogContent>
        <InputContainer>
          <Label>아이디</Label>
          <Input type="text" name="id" placeholder="ID"/>
          <Label>비밀번호</Label>
          <Input type="password" name="password" placeholder="PASSWORD"/>
          <Label>비밀번호 재입력</Label>
          <Input type="password" name="check-password" placeholder="Retype PASSWORD"/>
          <Label>이름</Label>
          <Input type="text" name="name" placeholder="NAME"/>
          <Label>이메일</Label>
          <Input type='email' name="email" placeholder="E-MAIL"/>
        </InputContainer>
      </DialogContent>
      <DialogActions>
        <SubmitButton name="submit">가입하기</SubmitButton>
      </DialogActions>
    </DialogStyle>
  );
}

export default SignUpDialog;