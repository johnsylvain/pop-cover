import React, { useState } from 'react';
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
    display: flex;
    align-items: center;

    > svg {
      margin-right: 10px;
    }
  }
`;

export const Header = () => {
  const [loading, setLoading] = useState(false);
  const [{ isAuthed }, dispatch] = useAuth();
  const { setSnackbar } = useSnackbar();

  return (
    <StyledHeader>
      <h1>Pop Cover</h1>
      {isAuthed ? (
        <Button
          onClick={() => {
            logout();
            dispatch({ type: 'LOGOUT' });
            setSnackbar({ message: 'Logged out.' });
          }}
        >
          Logout
        </Button>
      ) : (
        <Button
          loading={loading}
          onClick={() => {
            setLoading(true);
            login()
              .then(token => {
                setLoading(false);
                if (token) {
                  dispatch({ type: 'LOGIN', payload: token });
                  setSnackbar({ message: 'Welcome! 👋' });
                } else {
                  setSnackbar({ message: 'nope' });
                }
              })
              .catch(() => {
                setLoading(false);
              });
          }}
        >
          Log into Spotify
        </Button>
      )}
    </StyledHeader>
  );
};
