import React, { useContext, useReducer } from 'react';

const Context = React.createContext();

const backdrops = [
  ['#E7DDE0', '#6C84B0'],
  ['#5878A7', '#7DA2D2'],
  ['#AED6CD', '#BCE8C8'],
  ['#DC9655', '#F8B95A']
];

const initialState = {
  name: '',
  image: null,
  backdrop: backdrops[0],
  backdrops
}

function reducer(state, action) {
  switch(action.type) {
    case 'SET_BACKDROP':
      return { ...state, backdrop: action.payload }
    case 'SET_NAME':
      return { ...state, name: action.payload }
    case 'SET_IMAGE':
      return { ...state, image: action.payload }
    default:
      return state;
  }
}

export const CoverArtProvider = ({ children }) => {
  const value = useReducer(reducer, initialState);
  return (
    <Context.Provider value={value}>{children}</Context.Provider> 
  )
}

export const useCoverArt = () => {
  return useContext(Context);
}
