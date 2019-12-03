import React from "react"
import styled from "styled-components"
import AlertDialog from "../AlertDialog"

import firebase from "../../../shared/firebase"

const ReportBody = styled.div`
  display: flex;
  justify-content: center;
  height: 10rem;
  padding-bottom: 1rem;
`

const ReportTextBox = styled.textarea`
  height: 100%;
  width: 100%;
  border: solid 1px black;
  border-radius: 5px;
  padding: 0.6em;
  margin: 0 auto;
  resize: none;
`
function Components(props) {
  function ReportSubmit(e) {
    e.preventDefault()
    if (e.target.reportText.value === "") {
      alert("내용을 입력해주세요.")
    } else {
      if (props.isUser) {
        firebase.writeUserReport(props.targetId, e.target.reportText.value) //방번호, 유저번호
      } else {
        firebase.writeProductReport(props.targetId, e.target.reportText.value) //방번호, 유저번호
      }
      console.log(e.target.reportText.value)
      e.target.reportText.value = ""
      alert("의견 감사합니다.")
      props.onClick()
    }
  }

  let ReportContent = (
    <ReportBody>
      <ReportTextBox name="reportText" />
    </ReportBody>
  )
  return (
    <>
      <form method="POST" onSubmit={ReportSubmit}>
        <AlertDialog
          title={"신고하기"}
          content={ReportContent}
          cancelAble={true}
          onCancel={props.onClick}
        />
      </form>
    </>
  )
}

export default Components
