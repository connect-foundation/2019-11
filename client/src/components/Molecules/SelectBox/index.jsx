import React, { useState } from "react";
import styled from "styled-components";
import ItemList from "./List";

const Container = styled.div`
  position: relative;
  width: 100%;
  max-width: 10rem;
  height: 2rem;
`;

const ItemListDiv = styled.div`
  position: absolute;
  width: 100%;
  top: 2rem;
  z-index: 30;
  background: white;
  border-radius: 5px;
`;

const BoxHeader = styled.button`
  width: 100%;
  height: 100%;
  padding: 0.25rem 0.5rem;
  outline: none;
  background: white;
  border-radius: 5px;
  border: #aaaaaa solid 1px;
  text-align: left;
  font-weight: 700;

  &:hover {
    background: #dfdfdf;
  }
`;

const Component = ({ list, selected, show, handler }) => {
  const [header, setHeader] = useState("선택해주세요");
  const [open, setOpen] = useState(false);
  const handleListOpen = event => setOpen(!open);

  const listEvent = idx => {
    setHeader(list[idx]);
    handler(idx);
    setOpen(false);
  };

  return (
    <Container>
      <BoxHeader onClick={handleListOpen}>{header}</BoxHeader>
      <ItemListDiv>
        <ItemList
          open={open}
          show={show || 3}
          list={list}
          selected={selected}
          handler={listEvent}
        ></ItemList>
      </ItemListDiv>
    </Container>
  );
};

export default Component;
