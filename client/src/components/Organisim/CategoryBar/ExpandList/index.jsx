
import React from "react"
import styled from "styled-components"
import { Link } from "react-router-dom"
import UserInfoBox from "../../../Molecules/UserInfoBox"

const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 15em;
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

  let detailCategoryList = null
  if (details !== undefined) {
    detailCategoryList = details.details
  }


  return (
    <Container idx={idx} open={open}>
      {Number(idx) === 0 ? (
        <UserInfoBox onClick={onClick} />
      ) : (
        detailCategoryList.map(category => (
          <StyledLink
            to={`/category/${category.title}/${category.code}`}
            onClick={onClick}
            key={category.title}
          >
            <DetailCategory>
              <label>{category.title}</label>
            </DetailCategory>
          </StyledLink>
        ))
      )}
    </Container>
  );
};

export default Components;
