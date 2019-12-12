import React, { useEffect, useState } from "react";
import styled from "styled-components";
import useIntersect from "./useIntersect";
import Loadding from "../../Atoms/LoadingBar";
import NotFoundImage from "../../../assets/notFound.png";

const Container = styled.div`
  position: relative;
  width: 100%;
  min-height: 100%;
  display: flex;
  flex-direction: column;
`;

const LoaddingContainer = styled.div`
  position: absolute;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 2;
  width: 100%;
  height: 100%;
  opacity: 0.7;
  background-color: white;
`;

const NotFoundDiv = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const NotFoundSpan = styled.span`
  font-weight: "BMJUA";
  font-size: 1rem;
  font-weight: bold;
`;

const renderNotFound = () => {
  return (
    <NotFoundDiv>
      <img src={NotFoundImage} alt={"Not Found bee"} />
      <NotFoundSpan>검색 기록이 없습니다 ㅠㅠ</NotFoundSpan>
    </NotFoundDiv>
  );
};

const Component = ({ fetcher, drawer, refresh, hasMore }) => {
  const [loadding, setLoadding] = useState(true);
  const [list, setList] = useState([]);

  const [, setRef] = useIntersect(async (entry, observer) => {
    setLoadding(true);
    observer.unobserve(entry.target);
    await update();
    observer.observe(entry.target);
    setLoadding(false);
  }, {});

  useEffect(() => {
    if (refresh) {
      setList([]);
      setLoadding(true);
    }
  }, [refresh]);

  const update = async () => {
    const data = await fetcher();
    const components = drawer(data);

    setList(prev => [...prev, ...components]);

    return components.length;
  };

  return (
    <Container className={"hide-scroll"}>
      {loadding ? (
        <LoaddingContainer>
          <Loadding />
        </LoaddingContainer>
      ) : (
        undefined
      )}
      {list.length ? list.map(v => v) : renderNotFound()}
      {hasMore ? <div ref={setRef} /> : undefined}
    </Container>
  );
};

export default Component;
