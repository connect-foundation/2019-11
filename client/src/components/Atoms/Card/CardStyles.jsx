import styled from "styled-components";
import { Link } from "react-router-dom";

const CardStyle = styled.div`
  display: flex;
  flex-direction: column;
  border-radius: 1rem;
  margin: 1rem;
  background: white;
  width: 13rem;
  height: 17rem;
  padding: 0;
  cursor: pointer;
  box-shadow: 0 0.1rem 0.4rem 0 rgba(0, 0, 0, 0.2),
    0 0.3rem 0.2rem 0 rgba(0, 0, 0, 0.19);
  transition: all 0.15s ease-in-out;
  &:hover {
    transform: scale(1.05);
  }
`;

const CardTitle = styled.div`
  display: block;
  text-align: center;
  font-size: x-large;
`;

const InfoContainer = styled.div`
  display: flex;
  justify-content: space-around;
  flex: 1;
  padding: 0 1rem 1rem 1rem;
`;

const StyledLink = styled(Link)`
  text-decoration: none;
  color: black;
`;

const BidsStyle = styled.div`
  display: flex;
  align-items: flex-end;
  img {
    width: 0.8rem;
    height: 0.8rem;
    margin-right: 0.1rem;
  }
  font-size: small;
`;

const TagContainerStyle = styled.div`
  display: flex;
  font-size: x-small;
  padding: 0.1rem;
`;

const IsAuctionTag = styled.div`
  border-radius: 0.5rem;
  border: red solid 0.1rem;
  color: red;
  padding: 0.1rem 0.3rem 0.1rem 0.3rem;
  margin: 0.25rem;
`;

const DDayTag = styled.div`
  border-radius: 0.5rem;
  border: var(--color-secondary) solid 0.1rem;
  color: var(--color-secondary);
  padding: 0.1rem 0.3rem 0.1rem 0.3rem;
  margin: 0.25rem;
`;

const ThumbnailStyle = styled.div`
  display: flex;
  height: 10rem;
  border-radius: 1rem 1rem 0 0;
  overflow: hidden;
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;

export {
  CardStyle,
  CardTitle,
  InfoContainer,
  StyledLink,
  BidsStyle,
  TagContainerStyle,
  IsAuctionTag,
  DDayTag,
  ThumbnailStyle
};
