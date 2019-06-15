import React from 'react';
import styled from 'styled-components';
import { useTransition, animated } from 'react-spring';

import { useSnackbar } from '../context/snackbar';

const StyledSnackbar = styled(animated.div)`
  background: rgba(26, 20, 20, 0.7);
  color: white;
  font-weight: 500;
  position: fixed;
  z-index: 1000;
  bottom: 20px;
  left: 50%;
  padding: 0.5em 1em;
  border-radius: 4px;
`;

export const Snackbar = () => {
  const { snackbar } = useSnackbar();
  const transitions = useTransition(snackbar.visible, null, {
    from: { transform: 'translate3d(-50%, 200px, 0)' },
    enter: { transform: 'translate3d(-50%, 0px, 0)' },
    leave: { transform: 'translate3d(-50%, 200px, 0)' }
  });

  return transitions.map(
    ({ props, key, item }) =>
      item && (
        <StyledSnackbar key={key} style={props}>
          {snackbar.message}
        </StyledSnackbar>
      )
  );
};
