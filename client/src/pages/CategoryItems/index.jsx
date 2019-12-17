import React, { useState, useEffect } from "react";
import styled from "styled-components";
import CardContainer from "../../components/Molecules/CardContainer";

import apiConfig from "../../config/api";
import pathConfig from "../../config/path";
import ErrorPage from "../ErrorPage";
import { getFetch } from "../../services/fetchService";
const { apiUrl } = apiConfig;
const { items, statics } = pathConfig;

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
  const categoryCode = Number(match.params.code);
  const [itemlist, setItemslist] = useState([]);
  const [title, setTitle] = useState("");

  const getCategoryList = async () => {
    const result = await getFetch(
      `${apiUrl}${statics.categories}/${categoryCode}`,
      {},
      { code: categoryCode }
    );
    setTitle(result.title);
  };

  const fetcher = async () => {
    setItemslist([]);
    const url = `${apiUrl}${items.category}/${categoryCode}`;
    let result = await fetch(url);
    const list = await result.json();

    setItemslist(list[0]);
  };
  useEffect(() => {
    getCategoryList();
    fetcher();
  }, [categoryCode]);

  return (
    <>
      {title.length ? (
        <MainStyle>
          <CardContainer items={itemlist} title={title} isWrap={true} />
        </MainStyle>
      ) : (
        <ErrorPage />
      )}
    </>
  );
};

export default CategoryItems;
