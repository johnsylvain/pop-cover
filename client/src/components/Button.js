import styled, { css } from 'styled-components';

export const Button = styled.button`
  padding: 14px 56px;
  font-weight: 700;
  font-family: inherit;
  border-radius: 500px;
  cursor: pointer;
  outline: 0;
  border: 0;
  font-size: 1rem;
  white-space: nowrap;
  background: transparent;
  border: 2px solid #555555;
  color: #555555;

  ${props =>
    props.primary &&
    css`
      color: white;
      background: #1db954;
      border: 2px solid #1db954;

      &:hover {
        background: #1ed760;
      }
    `}
`;
