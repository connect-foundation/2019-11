import styled from "styled-components";

const WIDTH = 5;

const Container = styled.div`
  display: flex;
  position: relative;
`;

const OriginWrapper = styled.div`
  width: ${WIDTH}rem;
  display: flex;
  flex-direction: column;
  z-index: 2;
  background: var(--color-tertiary-darker);
`;

const ListWrapper = styled.div`
  position: absolute;
  width: ${props => (props.open ? 15 : 0)}rem;
  height: 100%;
  left: ${WIDTH}em;
  z-index: 999;

  overflow: hidden;
  transition: width 0.35s ease-in-out;
`;

const Bar = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  width: 100%;
  overflow-y: auto;
  box-sizing: border-box;
  padding: 0.5em 1em;
`;

const List = styled.ul`
  flex-grow: 1;
  list-style: none;
  padding: 0;
  margin: 0;
`;
const DivisionLine = styled.hr`
  width: 100%;
  border-top: 1px solid var(--color-quaternary);
  border-left: none;
`;

export { Container, OriginWrapper, ListWrapper, Bar, List, DivisionLine };
