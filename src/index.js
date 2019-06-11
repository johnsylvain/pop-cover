import React from 'react';
import { render } from 'react-dom';
import { BrowserRouter, Route } from 'react-router-dom';

import { useDocumentTitle } from './hooks/useDocumentTitle';

import { GlobalStyle } from './styles/GlobalStyle';

import { Home } from './pages/Home';
import { About } from './pages/About';

import { CoverArtProvider } from './context/cover-art';

const App = () => {
  useDocumentTitle(`This is${name ? `: ${name}` : ''}`);

  return (
    <CoverArtProvider>
      <GlobalStyle />
      <BrowserRouter>
        <Route path="/" exact component={Home}></Route>
        <Route path="/about" exact component={About}></Route>
      </BrowserRouter>
    </CoverArtProvider>
  );
};

render(<App />, document.querySelector('#app'));
