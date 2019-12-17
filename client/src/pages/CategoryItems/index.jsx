import React, { useState, useEffect } from "react";
import styled from "styled-components";
import CardContainer from "../../components/Molecules/CardContainer";

import apiConfig from "../../config/api";
import pathConfig from "../../config/path";
import detailCategoryList from "../../data/detail-category-list";
import ErrorPage from "../ErrorPage";
const { apiUrl } = apiConfig;
const { items } = pathConfig;

const MainStyle = styled.div`
  display: flex;
  font-family: "BMJUA";
  width: 100%;
  flex-direction: column;
  justify-content: center;
  .category {
    display: flex;
    font-size: xx-large;
    justify-content: flex-start;
    padding-left: 10rem;
  }
`;

const CategoryItems = ({ match }) => {
  const categoryCode = match.params.code;
  const [itemlist, setItemslist] = useState([]);

  let categoryTitle = detailCategoryList.reduce((acc, ele) => {
    let array = ele.details.filter(details => details.code === Number(categoryCode));
    if (array.length) acc.push(...array);
    return acc;
  }, []);

  const fetcher = async () => {
    setItemslist([]);
    const url = `${apiUrl}${items.category}/${categoryCode}`;
    let result = await fetch(url);
    const list = await result.json();

    setItemslist(list[0]);
  };
  useEffect(() => {
    fetcher();
  }, [categoryCode]);

  return (
    <>
      {categoryTitle.length ? (
        <MainStyle>
          <CardContainer items={itemlist} title={categoryTitle[0].title} isWrap={true} />
        </MainStyle>
      ) : (
        <ErrorPage />
      )}
    </>
  );
};

export default CategoryItems;
