import React, { useContext } from "react";
import styled from "styled-components";
import ModalContext from "../../../context/ModalContext";
import ReportModal from "../../Molecules/CustomModal/ReportModal";

const Button = styled.button`
  margin: 0 var(--margin-xs);
  padding: var(--padding-xs);
  font-size: 0.5rem;
  font-weight: bold;
  color: var(--color-primary);
  border-radius: 16px;
  display: inline-block;
  border: 1px solid var(--color-primary);
  background-color: white;

  &:hover {
    color: white;
    background-color: var(--color-primary);
    cursor: pointer;
  }
`;
const ButtonWrap = styled.div`
  display: inline-block;
  height: 2rem;
  margin: 0;
`;
/**
 * 유저여부와, 해당 id를 입력하여 신고하기 버튼 제작
 *
 * isUser : boolean
 * targetId : id
 */
const Component = props => {
  const [modal, setModal] = useContext(ModalContext);
  function ReportWrite() {
    return setModal({
      isOpen: true,
      component: ReportModal,
      props: { userId: props.userId, productId: props.productId }
    });
  }
  return (
    <ButtonWrap>
      <Button onClick={ReportWrite}>{props.text}</Button>
    </ButtonWrap>
  );
};

export default Component;
