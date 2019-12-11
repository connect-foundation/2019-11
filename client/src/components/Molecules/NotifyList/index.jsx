import React, { useContext } from "react";
import styled from "styled-components";
import userContext from "../../../context/UserContext";

const BackColor = styled.div`
  background-color: var(--color-gray-lighter);
  overflow: auto;
  width: 100%;
  height: 100%;
  &::-webkit-scrollbar {
    display: none !important;
  }
`;
const InfoDiv = styled.div`
  display: flex;
  flex-direction: column;
  font-family: "BMJUA";
  background-color: var(--color-gray-lighter);
  width: 100%;
`;
const Test = styled.div`
  font-family: "BMJUA";
  background-color: black;
  margin: 1rem auto;
  width: 18rem;
  height: 3rem;
`;
function Component(props) {
  const [user, setUser] = useContext(userContext);

  return (
    <BackColor>
      <InfoDiv>
        <Test />
        <Test />
        <Test />
        <Test /> <Test />
        <Test />
        <Test />
        <Test />
        <Test /> <Test />
        <Test />
        <Test />
        <Test />
        <Test /> <Test />
        <Test />
        <Test />
        <Test />
        <Test /> <Test />
      </InfoDiv>
    </BackColor>
  );
}

export default Component;
