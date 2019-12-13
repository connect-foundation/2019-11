import React, { useState } from "react";
import styled from "styled-components";
import RatingDialog from "../../Molecules/RatingDialog";

const Button = styled.button`
  margin: 0 var(--margin-xs);
  padding: var(--padding-xs);
  font-size: 0.5rem;
  font-weight: bold;
  color: var(--color-primary);
  border-radius: 16px;
  display: inline-block;
  border: 1px solid var(--color-primary);
  background-color: white;

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
 * 해당 유저에대해 평가 진행
 *
 * userid : number
 * targetId : id
 */
const Component = props => {
  const [show, setShow] = useState(false);
  function RatingWrite() {
    setShow(!show);
  }
  return (
    <ButtonWrap>
      <Button onClick={RatingWrite}>{props.text}</Button>
      {show ? (
        <RatingDialog
          onClick={RatingWrite}
          isSeller={props.isSeller}
          targetId={props.targetId}
          productId={props.productId}
        />
      ) : (
        undefined
      )}
    </ButtonWrap>
  );
};

export default Component;
