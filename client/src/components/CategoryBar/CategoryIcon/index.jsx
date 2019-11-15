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
  background: ${props => props.color};
  border-radius: 20%;
`;

const Components = props => {
  return (
    <Wrapper color={props.color}>
      <ImgIcon img={props.img}></ImgIcon>
      <TextIcon
        color={props.color}
        active={props.active}
        onClick={props.onClick}
      >
        {props.text}
      </TextIcon>
    </Wrapper>
  );
};

export default Components;
