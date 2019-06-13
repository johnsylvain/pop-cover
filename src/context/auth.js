import React, { useContext, useReducer } from 'react';

const Context = React.createContext();

const initialState = {
  token: null,
  isAuthed: false
};

function reducer(state, action) {
  switch (action.type) {
    case 'SET_TOKEN':
      return { ...state, token: action.payload, isAuthed: true };
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
