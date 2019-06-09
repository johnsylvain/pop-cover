import React, { useContext, useReducer } from 'react';

const Context = React.createContext();

const initialState = {
  name: '',
  image: null,
  gradient: 0,
  coverArt: null
}

export const CoverArtProvider = ({ children, reducer }) => {
  const value = useReducer(reducer, initialState);
  return (
    <Context.Provider value={value}>{children}</Context.Provider> 
  )
}

export const useCoverArt = () => {
  return useContext(Context);
}
