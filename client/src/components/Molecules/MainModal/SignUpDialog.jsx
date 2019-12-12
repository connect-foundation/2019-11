import React, { useState, useContext, useEffect } from "react";
import styled from "styled-components";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import ReactTooltip from "react-tooltip";
import { DialogStyle, Input, SubmitButton } from "./LoginDialogStyles";
import UserContext from "../../../context/UserContext";
import apiConfig from "../../../config/api";
import pathConfig from "../../../config/path";
import { postJsonFetch } from "../../../services/fetchService";
import { validate } from "./constant";
const { apiUrl } = apiConfig;
const { users } = pathConfig;
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
const ToolTip = styled(ReactTooltip)`
  font-family: "BMJUA";
`;
const SignUpDialog = ({ close, isSignUp }) => {
  const [uid, setUid] = useState(-1);
  const [id, setId] = useState("");
  const [password, setPassword] = useState("");
  const [setRetypePwd] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [user, setUser] = useContext(UserContext);
  const [isValidateId, setIsValidateId] = useState(false);
  const [isValidatePwd, setIsValidatePwd] = useState(false);
  const [isValidateRetypePwd, setIsValidateRetypePwd] = useState(false);
  const [isValidateEmail, setIsValidateEmail] = useState(false);
  const [isValidateName, setIsValidateName] = useState(false);
  useEffect(() => {
    if (!isSignUp) {
      setId(user.loginId);
      setIsValidateId(true);
      setUid(user.id);
    }
  }, []);

  const checkIdIsValidate = text => {
    setIsValidateId(validate.id.test(text));
  };

  const checkPwdIsValidate = text => {
    const { length, alphabet, number } = validate.password;
    if (!length.test(text) || !alphabet.test(text) || !number.test(text)) setIsValidatePwd(false);
    else setIsValidatePwd(true);
  };

  const checkRetypePwdValidate = text => {
    setIsValidateRetypePwd(password === text);
  };

  const checkEmailValidate = text => {
    setIsValidateEmail(validate.email.test(text));
  };
  const checkNameValidate = text => {
    setIsValidateName(text !== "");
  };

  const handleIdKeyUp = e => {
    setId(e.target.value);
    checkIdIsValidate(e.target.value);
  };
  const handlePasswordKeyUp = e => {
    setPassword(e.target.value);
    checkPwdIsValidate(e.target.value);
  };
  const handleRetypePwdKeyUp = e => {
    setRetypePwd(e.target.value);
    checkRetypePwdValidate(e.target.value);
  };
  const handleNameKeyUp = e => {
    setName(e.target.value);
    checkNameValidate(e.target.value);
  };
  const handleEmailKeyUp = e => {
    setEmail(e.target.value);
    checkEmailValidate(e.target.value);
  };

  const checkIsValidateAll = () => {
    return (
      isValidateId && isValidatePwd && isValidateRetypePwd && isValidateName && isValidateEmail
    );
  };

  const handleOnBlurIdInput = () => {};

  const handleSubmit = async e => {
    e.preventDefault();
    if (!checkIsValidateAll()) {
      const alertMsg = `다음 입력이 올바르지 않습니다.\n${!isValidateId ? "- 아이디\n" : ""}${
        !isValidatePwd ? "- 비밀번호\n" : ""
      }${!isValidateRetypePwd ? "- 비밀번호 재입력\n" : ""}${!isValidateName ? "- 이름\n" : ""}${
        !isValidateEmail ? "- 이메일" : ""
      }`;
      alert(alertMsg);
    } else {
      const body = {
        uid,
        id,
        password,
        name,
        email,
        signUp: isSignUp
      };
      const result = await postJsonFetch(`${apiUrl}${users}`, {}, body);
      const { msg, user } = result;
      if (msg) {
        setUser(user);
        localStorage.setItem("access-token", user.accessToken);
        localStorage.setItem("refresh-token", user.refreshToken);
        isSignUp ? alert("회원가입 완료") : alert("회원정보수정 완료");
        close();
      } else {
        isSignUp ? alert("이미 존재하는 아이디입니다.") : alert("회원 정보 수정에 실패하였습니다.");
      }
    }
  };
  return (
    <DialogStyle>
      <DialogContent>
        <InputContainer>
          <Label>아이디</Label>
          <Input
            data-tip="5-20자의 영문,숫자로 작성"
            type="text"
            name="id"
            placeholder="ID"
            onKeyUp={handleIdKeyUp}
            onBlur={handleOnBlurIdInput}
            {...(isSignUp ? undefined : { value: user.loginId })}
            disabled={!isSignUp}
          />
          <Label>비밀번호</Label>
          <Input
            data-tip="8-16자의 영어,숫자,특수문자를 조합하여 작성"
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
            onKeyUp={handleRetypePwdKeyUp}
          />
          <Label>이름</Label>
          <Input type="text" name="name" placeholder="NAME" onKeyUp={handleNameKeyUp} />
          <Label>이메일</Label>
          <Input type="email" name="email" placeholder="E-MAIL" onKeyUp={handleEmailKeyUp} />
          <ToolTip place="right" effect="solid" />
        </InputContainer>
      </DialogContent>
      <DialogActions>
        <SubmitButton onClick={handleSubmit} type="submit">
          {isSignUp ? "가입하기" : "수정완료"}
        </SubmitButton>
      </DialogActions>
    </DialogStyle>
  );
};
export default SignUpDialog;
