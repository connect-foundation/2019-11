import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import UserInfoBox from "../../../Molecules/UserInfoBox";
import NotifyList from "../../../Molecules/NotifyList";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: ${props => (props.idx === 999 ? "21" : "15")}rem;
  height: 100%;
  overflow-y: auto;
  background-color: var(--color-secondary-minus1);
  box-sizing: border-box;
  z-index: 1;
`;

const DetailCategory = styled.div`
  font-family: "BMJUA";
  font-size: large;
  text-align: center;
  padding: 1em;
  cursor: pointer;

  transition: all 0.3s ease-in-out;
  &:hover {
    background-color: var(--color-secondary-plus0);
  }

  label {
    cursor: pointer;
  }
`;
const StyledLink = styled(Link)`
  text-decoration: none;
  color: black;
`;

const Components = ({ idx, open, details, onClick }) => {
  return (
    <Container idx={idx} open={open}>
      {Number(idx) === 0 ? (
        <UserInfoBox onClick={onClick} />
      ) : Number(idx) === 999 ? (
        <NotifyList />
      ) : (
        details.map((category, index) => (
          <StyledLink to={`/category/${idx * 1000 + index + 1}`} onClick={onClick} key={category}>
            <DetailCategory>
              <label>{category}</label>
            </DetailCategory>
          </StyledLink>
        ))
      )}
    </Container>
  );
};

export default Components;
