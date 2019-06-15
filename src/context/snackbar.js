import React, { createContext, useContext, useReducer } from 'react';

const Context = createContext();

function reducer(state, action) {
  switch (action.type) {
    case 'SET_MESSAGE':
      return { ...state, visible: true, message: action.payload };
    case 'HIDE_MESSAGE':
      return { ...state, visible: false };
    default:
      return state;
  }
}

export const SnackbarProvider = ({ children }) => {
  const [snackbar, dispatch] = useReducer(reducer, {
    visible: false,
    message: null
  });

  const clearSnackbar = () => {
    dispatch({ type: 'HIDE_MESSAGE' });
  };

  const setSnackbar = ({ message, timeout = 3500 }) => {
    dispatch({ type: 'SET_MESSAGE', payload: message });

    setTimeout(() => {
      clearSnackbar();
    }, timeout);
  };

  return (
    <Context.Provider value={{ snackbar, setSnackbar, clearSnackbar }}>
      {children}
    </Context.Provider>
  );
};

export const useSnackbar = () => {
  return useContext(Context);
};
