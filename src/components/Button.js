import React from 'react';
import styled, { css } from 'styled-components';

import { Spinner } from './Spinner';

const StyledButton = styled.button`
  outline: 0;
  border: 0;
  font-size: inherit;
  font-weight: 600;
  font-family: inherit;
  display: inline-block;
  cursor: pointer;
  border-radius: 4px;
  padding: 0.5em 1em;
  opacity: 0.6;
  position: relative;

  &:hover {
    opacity: 1;
  }

  &:disabled {
    cursor: not-allowed;
    opacity: 0.5;
  }

  ${props =>
    props.primary &&
    css`
      opacity: 0.9;
      background: #1db954;
      color: white;
    `}
`;

const Span = styled.span`
  opacity: ${props => (props.loading ? 0 : 1)};
  transition: 200ms ease;
`;

const SpinnerContainer = styled.div`
  position: absolute;
  left: 0px;
  top: 0px;
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const Button = ({ children, loading, ...rest }) => {
  const { primary } = rest;

  return (
    <StyledButton {...rest}>
      <Span loading={loading}>{children}</Span>
      {loading && (
        <SpinnerContainer>
          <Spinner light={primary} />
        </SpinnerContainer>
      )}
    </StyledButton>
  );
};
