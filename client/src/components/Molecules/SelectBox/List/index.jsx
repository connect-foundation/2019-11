import React from "react";
import styled from "styled-components";

import ListItem from "../ListItem";

const Container = styled.div`
  width: 100%;
  height: ${props => (props.open ? 2 : 0) * props.count}rem;
  box-sizing: border-box;
  overflow: hidden;
  transition: height 0.2s ease-in-out;
  border-radius: inherit;

  ${props => {
    if (props.open) return `border: #aaaaaa solid 1px;`;
  }}
`;

const Wrapper = styled.div`
  width: 100%;
  height: ${props => props.count * 2}rem;
  overflow-y: auto;
  overflow-x: hidden;
`;

const Component = props => {
  const { open, show, selected, list, handler } = props;

  return (
    <Container open={open} count={show < list.length ? show : list.length}>
      <Wrapper count={show < list.length ? show : list.length}>
        {list.map((value, idx) => (
          <ListItem
            key={idx}
            text={value}
            selected={selected === idx}
            onClick={ev => {
              handler(idx);
            }}
          />
        ))}
      </Wrapper>
    </Container>
  );
};

export default Component;
