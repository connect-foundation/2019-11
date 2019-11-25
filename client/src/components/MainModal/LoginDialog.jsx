import React from 'react';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import { DialogStyle,
         InputContainer,
         Input,
         SubmitButton,
         DivisionLine,
         Footer,
         OAuthLoginButton,
         SignUpButton
        } from './LoginDialogStyles'

const LoginDialog = ({signUp}) => {
  return (
    <DialogStyle>
      <DialogContent>
        <InputContainer>
          <Input type="text" name="id" placeholder="ID"/>
          <Input type="password" name="password" placeholder="PASSWORD"/>
        </InputContainer>
      </DialogContent>
      <DialogActions>
        <SubmitButton name="submit">로그인</SubmitButton>
      </DialogActions>
      <DivisionLine/>
      <Footer>
        <OAuthLoginButton color="white">구글</OAuthLoginButton>
        <OAuthLoginButton color="yellow">카카오</OAuthLoginButton>
        <OAuthLoginButton color="#2DB400">네이버</OAuthLoginButton>
        <SignUpButton onClick={signUp}>회원가입</SignUpButton>
      </Footer>
    </DialogStyle>
  );
}

export default LoginDialog;