import React from "react";
import styled from "styled-components";
import { ClipLoader } from "react-spinners";

const SpinnerStyle = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
  flex-direction: column;
`;
const SpinnerText = styled.div`
  color: var(--color-primary);
  font-size: var(--font-size-xl);
  font-weight: bold;
  text-align: center;
  margin-bottom: var(--margin-md);
`;

const Spinner = () => {
  return (
    <SpinnerStyle>
      <SpinnerText>상품 준비중</SpinnerText>
      <ClipLoader color="#ff3466" />
    </SpinnerStyle>
  );
};

export default Spinner;
