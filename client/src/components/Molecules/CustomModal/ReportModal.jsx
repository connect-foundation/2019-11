import React, { useContext } from "react";
import firebase from "../../../shared/firebase";
import styled from "styled-components";
import ModalContext from "../../../context/ModalContext";

const ReportWrap = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  background-color: white;
  width: 30rem;
  padding: 1rem;
  border-radius: 10px;
`;

const ReportContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin-bottom: 0.5rem;
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
const ButtonWrap = styled.div`
  display: flex;
  justify-content: flex-end;
`;
const Button = styled.button`
  width: fit-content;
  padding: 0.3rem 1rem;
  font-size: 1.1rem;
  border-radius: 10px;
  margin-left: 3px;
  color: white;
`;
const ReportModal = props => {
  const [, setModal] = useContext(ModalContext);
  const handleClickCheckBtn = e => {
    setModal(state => ({ ...state, isOpen: false }));
  };

  function ReportSubmit(e) {
    e.preventDefault();
    if (e.target.type.value === "") {
      return alert("유형을 골라주세요.");
    }
    if (e.target.reportText.value === "") {
      alert("내용을 입력해주세요.");
    } else {
      if (e.target.type.value === "user") {
        firebase.writeUserReport(props.userId, e.target.reportText.value); //방번호, 유저번호
      } else {
        firebase.writeProductReport(props.productId, e.target.reportText.value); //방번호, 상품번호
      }
      e.target.reportText.value = "";
      alert("의견 감사합니다.");
      handleClickCheckBtn();
    }
  }

  return (
    <ReportWrap>
      <form method="POST" onSubmit={ReportSubmit}>
        <h2>신고하기</h2>
        <ReportContainer>
          <div>
            <select name="type" defaultValue={""}>
              <option value="" disabled hidden>
                유형을 선택해 주세요
              </option>
              <option value="user">유저가 이상해요</option>
              <option value="product">물품이 이상해요</option>
            </select>
          </div>
          <ReportBody>
            <ReportTextBox name="reportText" />
          </ReportBody>
        </ReportContainer>

        <ButtonWrap>
          <Button className={"danger"} onClick={handleClickCheckBtn}>
            취소
          </Button>
          <Button className={"success"}>확인</Button>
        </ButtonWrap>
      </form>
    </ReportWrap>
  );
};

export default ReportModal;
