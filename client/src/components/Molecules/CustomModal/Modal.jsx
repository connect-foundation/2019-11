import React, { useContext } from "react";
import styled from "styled-components";
import ModalContext from "../../../context/ModalContext";

const ModalStyle = styled.div`
  position: fixed;
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 2000;
`;

const ModalBackGround = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  background-color: black;
  opacity: 0.3;
`;

const ModalContentWrapper = styled.div`
  position: relative;
`;

export const Modal = () => {
  const [modal, setModal] = useContext(ModalContext);

  const ModalContent = modal.component;

  const handleClickModalBack = e => {
    setModal(state => ({ ...state, isOpen: false }));
  };
  return (
    <ModalStyle>
      <ModalBackGround onClick={handleClickModalBack}></ModalBackGround>
      <ModalContentWrapper>
        <ModalContent {...modal.props} />
      </ModalContentWrapper>
    </ModalStyle>
  );
};
