import React from 'react';
import styled from 'styled-components';

import { useCoverArt } from '../context/cover-art';

import { Check } from './Icon';

const Gradient = styled.div`
  width: 40px;
  height: 40px;
  background: linear-gradient(
    180deg,
    ${props => props.gradient[0]} 0%,
    ${props => props.gradient[1]} 100%
  );
  border-radius: 3px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: 5px;
`;

const Gradients = styled.div`
  display: flex;
  flex-wrap: wrap;
`;

export const GradientPicker = () => {
  const [{ backdrops, backdrop }, dispatch] = useCoverArt();

  const setBackdrop = backdrop => {
    dispatch({
      type: 'SET_BACKDROP',
      payload: backdrop
    });
  };

  return (
    <Gradients>
      {backdrops.map(gradient => (
        <Gradient
          key={gradient}
          gradient={gradient}
          onClick={() => setBackdrop(gradient)}
        >
          {gradient === backdrop && <Check />}
        </Gradient>
      ))}
    </Gradients>
  );
};
