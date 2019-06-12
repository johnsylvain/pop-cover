import styled, { css } from 'styled-components';

export const Button = styled.button`
  outline: 0;
  border: 0;
  font-size: inherit;
  font-weight: 600;
  font-family: inherit;
  display: inline-block;
  cursor: pointer;
  border-radius: 4px;
  padding: 0.5em 1em;
  opacity: 0.5;

  &:hover {
    opacity: 1;
  }

  ${props =>
    props.primary &&
    css`
      opacity: 0.9;
      background: #1db954;
      color: white;
    `}
`;
