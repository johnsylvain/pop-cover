import React from 'react';
import styled from 'styled-components';

import { login, logout } from '../util/auth';

import { useAuth } from '../context/auth';
import { useSnackbar } from '../context/snackbar';

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
  const { setSnackbar } = useSnackbar();

  return (
    <StyledHeader>
      <h1>Listify</h1>
      {isAuthed ? (
        <Button
          onClick={() => {
            logout();
            dispatch({ type: 'LOGOUT' });
            setSnackbar({ message: 'Logged out!' });
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
                setSnackbar({ message: 'Welcome! 👋' });
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
