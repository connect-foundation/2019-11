import styled from 'styled-components';
import { Link } from 'react-router-dom'

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
  box-shadow: 0 0.1rem 0.4rem 0 rgba(0, 0, 0, 0.2), 0 0.3rem 0.2rem 0 rgba(0, 0, 0, 0.19);
  transition: all .15s ease-in-out;
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
  padding: 0 1rem 1rem 1rem ;
`;

const StyledLink = styled(Link)`
  text-decoration: none;
  color: black;
`;

export { CardStyle, CardTitle, InfoContainer, StyledLink }