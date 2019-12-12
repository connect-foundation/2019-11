import React from "react";
import styled from "styled-components";
import AlertDialog from "../AlertDialog";
import firebase from "../../../shared/firebase";

const ReportContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

const ReportBody = styled.div`
  display: flex;
  justify-content: center;
  height: 10rem;
  padding-bottom: 1rem;
`;

const ReportTextBox = styled.textarea`
  height: 100%;
  width: 100%;
  border: solid 1px black;
  border-radius: 5px;
  padding: 0.6em;
  margin: 0 auto;
  resize: none;
`;
function Components(props) {
  function ReportSubmit(e) {
    e.preventDefault();
    if (e.target.rate.value === "") {
      return alert("점수를 선택해 주세요.");
    } else {
      alert("의견 감사합니다.");
      props.onClick();
    }
  }

  let ReportContent = (
    <ReportContainer>
      <div>
        <select name="rate" defaultValue={""}>
          <option value="" disabled hidden>
            점수를 선택 해주세요
          </option>
          <option value={-10}>-10</option>
          <option value={-5}>-5</option>
          <option value={5}>5</option>
          <option value={10}>10</option>
        </select>
      </div>
    </ReportContainer>
  );
  return (
    <>
      <form method="POST" onSubmit={ReportSubmit}>
        <AlertDialog
          title={"평가하기"}
          content={ReportContent}
          cancelAble={true}
          onCancel={props.onClick}
        />
      </form>
    </>
  );
}

export default Components;
