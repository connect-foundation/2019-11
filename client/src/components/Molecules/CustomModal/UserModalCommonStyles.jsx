import styled from "styled-components";

const ModalBody = styled.div`
  display: flex;
  flex-direction: column;
  background: white;
  border-radius: 5px;
`;

const Input = styled.input`
  padding: 1em;
  border: 0.1px solid;
  font-family: "BMJUA";
`;

const SubmitButton = styled.button`
  padding: 1em;
  color: white;
  background: var(--color-quaternary);
  font-family: "BMJUA";
  border-radius: 3px;
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: flex-end;
  margin-top: 0.2em;
`;

export { ModalBody, Input, SubmitButton, ButtonContainer };
