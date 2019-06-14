import React from 'react';
import { render } from 'react-dom';
import { BrowserRouter, Route } from 'react-router-dom';

import { GlobalStyle } from './styles/GlobalStyle';

import { CoverArtProvider } from './context/cover-art';
import { AuthProvider } from './context/auth';

import { Home } from './pages/Home';
import { Callback } from './pages/Callback';

const App = () => {
  return (
    <AuthProvider>
      <CoverArtProvider>
        <GlobalStyle />
        <BrowserRouter>
          <Route path="/" exact component={Home} />
          <Route path="/callback" exact component={Callback} />
        </BrowserRouter>
      </CoverArtProvider>
    </AuthProvider>
  );
};

render(<App />, document.querySelector('#app'));
