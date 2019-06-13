import React, { useEffect } from 'react';
import { render } from 'react-dom';

import { CoverArt } from './components/CoverArt';
import { Controls } from './components/Controls';
import { Page } from './components/Page';

import { GlobalStyle } from './styles/GlobalStyle';

import { CoverArtProvider } from './context/cover-art';
import { AuthProvider, useAuth } from './context/auth';

function getQueryStringValue(key) {
  return decodeURIComponent(
    window.location.search.replace(
      new RegExp(
        '^(?:.*[&\\?]' +
          encodeURIComponent(key).replace(/[\.\+\*]/g, '\\$&') +
          '(?:\\=([^&]*))?)?.*$',
        'i'
      ),
      '$1'
    )
  );
}

const Home = () => {
  const [{ isAuthed }, dispatch] = useAuth();
  const token = getQueryStringValue('token');

  useEffect(() => {
    if (!isAuthed && token) {
      dispatch({
        type: 'SET_TOKEN',
        payload: token
      });
      window.localStorage.setItem('token', token);
    }
  }, [isAuthed, token]);

  return (
    <Page>
      <CoverArt />
      <Controls />
    </Page>
  );
};

const App = () => {
  return (
    <AuthProvider>
      <CoverArtProvider>
        <GlobalStyle />
        <Home></Home>
      </CoverArtProvider>
    </AuthProvider>
  );
};

render(<App />, document.querySelector('#app'));
