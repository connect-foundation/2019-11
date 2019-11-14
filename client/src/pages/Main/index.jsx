import React, { useState, useEffect }from 'react';
import styled from 'styled-components';
import CardContainer from '../../components/CardContainer';

const MainStyle = styled.div`
  display: flex;
  font-family: 'BMJUA';
  width: 100%;
  flex-direction: column;
  justify-content: center;
  .category {
    display: flex;
    font-size: xx-large;
    justify-content: flex-start;
    padding-left:10rem;
  }
`;

const Main = () => {
  const [popular, setPopular] = useState([]);
  const [deadline, setDeadline] = useState([]);

  const getPopular = () => {
    fetch('/mock/popular-items/popular-items.json')
    .then(result => result.json())
    .then(result => setPopular(result))
  }

  const getDeadLine = () => {
    fetch('/mock/deadline-items/deadline-items.json')
    .then(result => result.json())
    .then(result => setDeadline(result))
  }

  useEffect(() => {
    getPopular()
  },[])

  useEffect(() => {
    getDeadLine()
  }, [])

  return (
    <MainStyle>
      <label className="category">HOT - 인기 경매 상품</label>
      <CardContainer className="popular" items={popular}/>
      <label className="category">HURRY UP - 마감 임박 경매 상품</label>
      <CardContainer className="deadline" items={deadline}/>
    </MainStyle>
  )
}

export default Main;