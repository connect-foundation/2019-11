import React from "react";
import styled from "styled-components";
import NotFoundImg from "../../assets/notFound.png";

const Wrap = styled.div`
  width: 100%;
  margin: auto 0;
  display: flex;
  justify-content: center;
  font-family: "BMJUA";
`;
const Contents = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  text-align: right;
`;
const Image = styled.div``;

const Error = () => {
  return (
    <Wrap>
      <Contents>
        <h2>요청한 페이지를 찾을 수 없습니다.</h2>
        <span>존재하지 않는 주소를 입력하셨거나,</span>
        <span>요청하신 페이지의 주소가 변경, 삭제되어 찾을 수 없습니다.</span>
        <span>입력하신 주소가 정확한지 다시 한 번 확인해 주시길 바랍니다.</span>
      </Contents>
      <Image>
        <img src={NotFoundImg} />
      </Image>
    </Wrap>
  );
};

export default Error;
