import React from 'react';
import styled from 'styled-components';

import { login, logout } from '../util/auth';
import { useAuth } from '../context/auth';
import { Button } from './Button';

const StyledHeader = styled.header`
  display: flex;
  align-items: baseline;
  padding: 40px 0;

  & > h1 {
    font-size: 1.5rem;
    font-weight: 700;
    flex-grow: 1;
  }
`;

export const Header = () => {
  const [{ isAuthed }, dispatch] = useAuth();

  return (
    <StyledHeader>
      <h1>This playlist</h1>
      {isAuthed ? (
        <Button
          onClick={() => {
            logout();
            dispatch({ type: 'LOGOUT' });
          }}
        >
          Logout
        </Button>
      ) : (
        <Button
          onClick={() => {
            login().then(token => {
              if (token) {
                dispatch({ type: 'LOGIN', payload: token });
              }
            });
          }}
        >
          Log into Spotify
        </Button>
      )}
    </StyledHeader>
  );
};
