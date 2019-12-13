import styled from "styled-components";

const TextIcon = styled.span`
  font-family: "BMJUA";
  font-size: 1.5em;
  position: absolute;
  display: grid;
  color: var(--color-secondary-lighter);
  background: white;

  cursor: pointer;

  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  z-index: 0;
  opacity: 0;
  transition: opacity 0.15s ease-in-out, color 0.15s ease-in-out;

  text-align: center;
  align-items: center;

  &:hover {
    opacity: 1;
    color: ${props => props.color};
  }
`;

export default TextIcon;
