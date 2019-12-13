import React from "react";
import styled from "styled-components";
import Card from "../../Atoms/Card";
import NotFoundImg from "../../../assets/notFound.png";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding-left: 8rem;
`;

const Title = styled.label`
  display: flex;
  font-size: xx-large;
  justify-content: flex-start;
`;

const CardContainerStyle = styled.div`
  display: flex;
  justify-content: flex-start;
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

const CardContainer = ({ title, items, isWrap }) => {
  return (
    <Container>
      <Title>{title}</Title>
      <CardContainerStyle isWrap={isWrap}>
        {items.length === 0 ? (
          <NotItemInfo>
            <img src={NotFoundImg}></img>
            <div>등록된 물품이 없습니다.</div>
          </NotItemInfo>
        ) : (
          items.map(item => <Card key={item.id} item={item} />)
        )}
      </CardContainerStyle>
    </Container>
  );
};

export default CardContainer;
