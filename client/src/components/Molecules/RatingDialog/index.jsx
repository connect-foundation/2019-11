import React from "react";
import styled from "styled-components";
import AlertDialog from "../AlertDialog";
import apiConfig from "../../../config/api";
import pathConfig from "../../../config/path";

const { apiUrl } = apiConfig;
const { productsRating } = pathConfig;
const ReportContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

function Components(props) {
  function ReportSubmit(e) {
    e.preventDefault();
    if (e.target.rate.value === "") {
      return alert("점수를 선택해 주세요.");
    } else {
      fetch(`${apiUrl}${productsRating}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          targetUserId: props.targetId,
          productId: props.productId,
          point: e.target.rate.value,
          isSeller: props.isSeller
        })
      }).then(result => {
        if (result) {
          alert("의견 감사합니다.");
          props.doCheck();
          props.onClick();
        } else {
          alert("잘못된 요청입니다.");
          props.onClick();
        }
      });
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
