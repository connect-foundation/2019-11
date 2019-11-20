import React from 'react';
import Dialog from '@material-ui/core/Dialog';
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
        } from './LoginModalStyles'

const LoginModal = ({open, onClose}) => {
  return (
    <Dialog
      open={open}
      onClose={onClose}
    >
      <DialogStyle>
        <DialogContent>
          <InputContainer>
            <Input name="id" placeholder="ID"/>
            <Input name="password" placeholder="PASSWORD"/>
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
          <SignUpButton>회원가입</SignUpButton>
        </Footer>
      </DialogStyle>
    </Dialog>
  );
}

export default LoginModal;