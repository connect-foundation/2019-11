import React, { useState, useEffect }from 'react';
import CardContainer from '../../components/CardContainer';

const Main = () => {
  const [popular, setPopular] = useState([]);

  const getPopular = () => {
    fetch('/mock/popular-items/popular-items.json')
    .then(result => result.json())
    .then(result => setPopular(result))
  }
  useEffect(() => {
    getPopular()
  },[])
  return (
    <>
      <CardContainer className="popular" populars={popular}/>
    </>
  )
}

export default Main;