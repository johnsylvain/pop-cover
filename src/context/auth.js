import React, { useContext, useReducer } from 'react';

import { getToken } from '../util/auth';

const Context = React.createContext();

const token = getToken();

const initialState = {
  token,
  isAuthed: !!token
};

function reducer(state, action) {
  switch (action.type) {
    case 'LOGIN':
      return { ...state, token: action.payload, isAuthed: true };
    case 'LOGOUT':
      return { ...state, token: undefined, isAuthed: false };
    default:
      return state;
  }
}

export const AuthProvider = ({ children }) => {
  const value = useReducer(reducer, initialState);
  return <Context.Provider value={value}>{children}</Context.Provider>;
};

export const useAuth = () => {
  return useContext(Context);
};
