import React from "react";
import styled from "styled-components";
import SmallCard from "../../Atoms/SmallCard";
import NotFoundImg from "../../../assets/notFound.png";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding-left: 2rem;
  padding-right: 2rem;
  width: 100%;
`;

const Title = styled.label`
  display: flex;
  font-size: x-large;
  justify-content: flex-start;
`;

const SmallCardContainerStyle = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
  height: ${props => (props.isWrap ? "35rem" : "17rem")};
  margin-bottom: 2rem;
  flex-wrap: ${props => (props.isWrap ? "wrap" : "")};
  overflow: ${props => (props.isWrap ? "auto" : "")};
`;

const NotItemInfo = styled.div`
  margin: auto;
  text-align: center;
`;

const SmallCardContainer = ({ title, items, isWrap }) => {
  return (
    <Container>
      <Title>{title}</Title>
      <SmallCardContainerStyle isWrap={isWrap}>
        {items.length === 0 ? (
          <NotItemInfo>
            <img src={NotFoundImg}></img>
            <div>등록된 물품이 없습니다.</div>
          </NotItemInfo>
        ) : (
          items.map(item => <SmallCard key={item.id} item={item} />)
        )}
      </SmallCardContainerStyle>
    </Container>
  );
};

export default SmallCardContainer;
