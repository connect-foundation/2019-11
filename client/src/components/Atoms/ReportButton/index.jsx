import React, { useState } from "react"
import styled from "styled-components"
import report from "../../../assets/report.svg"
import ReportDialog from "../../Molecules/ReportDialog"

const Button = styled.button`
  display: flex;
  width: 3rem;
  height: 3rem;
  justify-content: center;
  align-items: center;
  img {
    width: 70%;
    height: 70%;
  }
`
/**
 * 유저여부와, 해당 id를 입력하여 신고하기 버튼 제작
 *
 * isUser : boolean
 * target : id
 */
const Component = props => {
  const [show, setShow] = useState(false)
  function ReportWrite() {
    setShow(!show)
  }
  return (
    <>
      {show ? (
        <ReportDialog onClick={ReportWrite} isUser={props.isUser} targetId={props.targetId} />
      ) : (
        undefined
      )}

      <Button onClick={ReportWrite}>
        <img src={report} />
      </Button>
    </>
  )
}

export default Component
