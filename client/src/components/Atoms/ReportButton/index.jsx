import React, { useState } from "react";
import styled from "styled-components";
import report from "../../../assets/report.svg";
import ReportDialog from "../../Molecules/ReportDialog";

const Button = styled.button`
  width: 2.5rem;
  height: 2rem;
  &:hover {
    cursor: pointer;
  }
  img {
    width: 100%;
    height: 100%;
  }
`;
const ButtonWrap = styled.div`
  display: inline-block;
  width: 2.5rem;
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
      <Button onClick={ReportWrite}>
        <img src={report} alt={"report"} />
      </Button>
      {show ? <ReportDialog onClick={ReportWrite} targetId={props.targetId} /> : undefined}
    </ButtonWrap>
  );
};

export default Component;
