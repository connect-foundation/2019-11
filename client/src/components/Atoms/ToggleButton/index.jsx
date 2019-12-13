import React from "react";
import styled from "styled-components";

const Container = styled.div`
  position: relative;
  width: 60px;
  height: 20px;
  border: none;
  outline: none;
  display: flex;
`;

const Thumb = styled.span`
  position: absolute;
  width: 20px;
  height: 20px;
  box-sizing: border-box;
  z-index: 1;
  right: 0;
  border-radius: 50%;
  background: ${props => (props.checked ? "var(--color-primary)" : "var(--color-gray)")};
  -webkit-box-shadow: 0px 0px 7px 0px var(--color-darkgray-lighter);
  -moz-box-shadow: 0px 0px 7px 0px var(--color-darkgray-lighter);
  box-shadow: 0px 0px 7px 0px var(--color-darkgray-lighter);

  transition: transform 0.15s ease-in-out;
  ${props => (props.checked ? `transform: translateX(-40px)` : "")};
`;

const Bar = styled.div`
  width: 100%;
  height: 14px;
  background: #dfdfdf;
  border-radius: 7px;
  margin: auto 5px;
`;

const Component = ({ checked, onClick }) => {
  return (
    <Container onClick={onClick || undefined}>
      <Thumb checked={checked} />
      <Bar />
    </Container>
  );
};

export default Component;
