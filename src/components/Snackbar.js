import React from 'react';
import styled from 'styled-components';
import { useTransition, animated } from 'react-spring';

import { useSnackbar } from '../context/snackbar';

const Link = styled.a`
  color: white;
  font-weight: 600;
`;

const StyledSnackbar = styled(animated.div)`
  background: rgba(26, 20, 20, 0.9);
  color: white;
  font-weight: 500;
  position: fixed;
  z-index: 1000;
  bottom: 20px;
  left: 50%;
  padding: 0.5em 1em;
  border-radius: 4px;
  box-shadow: rgba(0, 0, 0, 0.1) 0px 16px 32px 0px,
    rgba(0, 0, 0, 0.08) 0px 8px 16px 0px;
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
          {snackbar.link && (
            <>
              {' '}
              <Link href={snackbar.link.url} target="_blank">
                {snackbar.link.text}
              </Link>
            </>
          )}
        </StyledSnackbar>
      )
  );
};
