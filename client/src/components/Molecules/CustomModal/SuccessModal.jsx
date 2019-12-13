import React, { useContext } from "react";
import SuccessIcon from "../../../assets/success.svg";
import styled from "styled-components";
import ModalContext from "../../../context/ModalContext";

const SuccessModalStyle = styled.div`
  width: 400px;
  height: 400px;
  display: flex;
  flex-direction: column;
  background-color: white;
  border-radius: 8px;
`;

const ModalHeader = styled.div`
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const ModalBody = styled.div`
  height: 50px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const ModalFooter = styled.div`
  height: 120px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const SuccessImage = styled.img`
  width: 120px;
  height: 120px;
`;

const SuccessText = styled.div`
  font-size: var(--font-size-lg);
  font-weight: bold;
  color: var(--color-darkgray);
`;

const CheckButton = styled.button`
  width: 120px;
  padding: 8px;
  font-size: var(--font-size-lg);
  border: 2px solid var(--color-success);
  color: var(--color-success);
  font-weight: bold;
  border-radius: 8px;

  &:hover {
    background-color: var(--color-success);
    color: white;
  }
`;

const SuccessModal = ({ message }) => {
  const [, setModal] = useContext(ModalContext);
  const handleClickCheckBtn = e => {
    setModal(state => ({ ...state, isOpen: false }));
  };

  return (
    <SuccessModalStyle>
      <ModalHeader>
        <SuccessImage src={SuccessIcon} />
      </ModalHeader>
      <ModalBody>
        <SuccessText>{message}</SuccessText>
      </ModalBody>
      <ModalFooter>
        <CheckButton onClick={handleClickCheckBtn}>확인</CheckButton>
      </ModalFooter>
    </SuccessModalStyle>
  );
};

export default SuccessModal;
