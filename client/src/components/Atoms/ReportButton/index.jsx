import React, { useState } from "react";
import styled from "styled-components";
import ReportDialog from "../../Molecules/ReportDialog";

const Button = styled.button`
  margin: 0 var(--margin-xs);
  padding: var(--padding-xs);
  font-size: 0.5rem;
  font-weight: bold;
  color: var(--color-primary);
  border-radius: 16px;
  display: inline-block;
  border: 1px solid var(--color-primary);

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
  const [show, setShow] = useState(false);
  function ReportWrite() {
    setShow(!show);
  }
  return (
    <ButtonWrap>
      <Button onClick={ReportWrite}>판매자 신고</Button>
      {show ? <ReportDialog onClick={ReportWrite} targetId={props.targetId} /> : undefined}
    </ButtonWrap>
  );
};

export default Component;
