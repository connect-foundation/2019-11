import React from "react";
import styled from "styled-components";
import ImgIcon from "./ImageIcon";
import TextIcon from "./TextIcon";

const Wrapper = styled.li`
  display: flex;
  position: relative;
  width: 100%;
  padding-top: 100%;
  margin-bottom: 0.5em;
  border-radius: 20%;
  overflow: hidden;
`;

const Components = props => {
  const { color, img, active, onClick, text, idx } = props;

  return (
    <Wrapper color={color}>
      <ImgIcon img={img} color={color}></ImgIcon>
      <TextIcon color={color} active={active} onClick={onClick} data-idx={idx}>
        {text}
      </TextIcon>
    </Wrapper>
  );
};

export default Components;
