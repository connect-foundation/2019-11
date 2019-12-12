import React, { useState, useContext } from "react";
import styled from "styled-components";

import PageBase from "../../../../components/PageBase";
import Button from "../../../../components/Atoms/BoxButton";
import CategorySelector from "../../../../components/Organisim/ItemCategorySelector";

import productContext from "../../context";

import { categoryList } from "../../constants.jsx";
import { idxNotSelected } from "../../../../utils/validator.js";

const ContentDiv = styled.div`
  width: 60%;
  margin: 0 auto;
`;

const ButtonContainer = styled.div`
  width: 100%;
  height: 3em;
  display: flex;
  justify-content: flex-end;
  margin: 1rem 0;
`;

const validation = (result, successCallback, failCallback) => {
  const isInvalid = result.some(value => value);
  isInvalid ? failCallback() : successCallback();
};

const Component = ({ width, next }) => {
  const obj = useContext(productContext).data;

  const [leftIdx, setLeftIdx] = useState(-1);
  const [rightIdx, setRightIdx] = useState(-1);

  const valiResult = [idxNotSelected(leftIdx), idxNotSelected(rightIdx)];

  const successCallback = () => {
    obj.categoryCode = (leftIdx + 1) * 1000 + rightIdx + 1;
    console.log(obj.categoryCode);
    next();
  };

  const failCallback = () => {
    alert("선택되지 않은 값이 있습니다.");
  };

  return (
    <PageBase width={width}>
      <ContentDiv>
        <CategorySelector
          lTitle={categoryList.leftTitle}
          rTitle={categoryList.rightTitle}
          lList={categoryList.leftList}
          rList={categoryList.rightList}
          lIdx={leftIdx}
          rIdx={rightIdx}
          lHandler={setLeftIdx}
          rHandler={setRightIdx}
        />
        <ButtonContainer>
          <Button
            onClick={ev => {
              validation(valiResult, successCallback, failCallback);
            }}
            text={"다음"}
          />
        </ButtonContainer>
      </ContentDiv>
    </PageBase>
  );
};

export default Component;
