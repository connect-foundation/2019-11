import React from "react";
import styled from "styled-components";

const SmallCardStyle = styled.div`
  display: flex;
  height: 9em;
  width: 9em;
  margin: 1rem;
  border-radius: 1rem;
  overflow: hidden;
  cursor: pointer;
  box-shadow: 0 0.1rem 0.4rem 0 rgba(0, 0, 0, 0.2),
    0 0.3rem 0.2rem 0 rgba(0, 0, 0, 0.19);
  transition: all 0.15s ease-in-out;
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }

  &:hover {
    transform: scale(1.05);
  }
`;

const SmallCard = ({ item }) => {
  const { id, thumbnailUrl } = item;
  const link = `/products/${id}`;
  return (
    <a href={link}>
      <SmallCardStyle>
        <img src={thumbnailUrl} alt={"thumbnail"} />
      </SmallCardStyle>
    </a>
  );
};

export default SmallCard;
