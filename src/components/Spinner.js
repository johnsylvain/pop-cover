import styled, { keyframes, css } from 'styled-components';

const spin = keyframes`
  from {
    transform: rotate(0deg);
  }

  to {
    transform: rotate(360deg);
  }
`;

export const Spinner = styled.div`
  width: 20px;
  height: 20px;
  border-radius: 50px;
  animation: ${spin} 600ms linear infinite;
  border: 2px solid rgba(0, 0, 0, 0.25);
  border-top-color: rgba(0, 0, 0, 0.5);

  ${props =>
    props.light &&
    css`
      border: 2px solid rgba(255, 255, 255, 0.4);
      border-top-color: white;
    `}
`;
