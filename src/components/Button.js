import styled, { css } from 'styled-components';

export const Button = styled.button`
  padding: 14px 56px;
  font-weight: 700;
  font-family: inherit;
  border-radius: 4px;
  cursor: pointer;
  outline: 0;
  border: 0;
  font-size: 1rem;
  white-space: nowrap;
  background: transparent;
  color: #555555;

  &:hover {
    background: rgba(131, 131, 131, 0.1);
  }

  ${props =>
    props.primary &&
    css`
      color: #1db954;

      &:hover {
        background: rgba(29, 185, 84, 0.1);
      }
    `}
`;
