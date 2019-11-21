import styled from 'styled-components';

const BUTTON_MARGIN = '0.5em';

const DialogStyle = styled.div`
  display: flex;
  flex-direction: column;
`;

const InputContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  height: 6em;
`;

const Input = styled.input`
  padding: 1em;
  border: 0.1px solid;
  font-family: "BMJUA";
`;

const SubmitButton = styled.button`
  padding: 1em;
  color: white;
  background: #5C5749;
  font-family: "BMJUA";
  border-radius: 20%;
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

const OAuthLoginButton = styled.button`
  width: 80%;
  background: ${props => props.color};
  margin-bottom: ${BUTTON_MARGIN};
  font-family: "BMJUA";
  box-shadow: 1px 2px 3px rgba(0, 0, 0, 0.1);
  padding: 1em;
  border-radius: 3px;
`;

const SignUpButton = styled.button`
  width: 80%;
  color: white;
  padding: 1em;
  font-family: "BMJUA";
  margin-bottom: ${BUTTON_MARGIN};
  background: #5C5749;
  box-shadow: 1px 2px 3px rgba(0, 0, 0, 0.1);
  border-radius: 3px;
`;

export { DialogStyle,
         InputContainer,
         Input,
         SubmitButton,
         DivisionLine,
         Footer,
         OAuthLoginButton,
         SignUpButton
        }