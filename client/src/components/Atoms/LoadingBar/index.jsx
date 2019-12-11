import React from "react";
import styled from "styled-components";

const Container = styled.div`
  display: flex;
  width: fit-content;
  height: 30px;
`;

const Content = styled.div`
  font-family: "BMJUA";
  display: flex;
  width: 60%;
  min-width: 400px;
  color: white;
  border-radius: 30px;
  background-color: var(--color-tertiary-plus0);
  align-items: center;
  justify-content: center;
`;

const Component = () => {
  return (
    <Container>
      <Content>
        <span>Loadding...</span>
      </Content>
    </Container>
  );
};

export default Component;
