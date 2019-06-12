import React from 'react';
import { render } from 'react-dom';

import { CoverArt } from './components/CoverArt';
import { Controls } from './components/Controls';
import { Page } from './components/Page';

import { GlobalStyle } from './styles/GlobalStyle';

import { CoverArtProvider } from './context/cover-art';

const App = () => {
  return (
    <CoverArtProvider>
      <GlobalStyle />
      <Page>
        <CoverArt />
        <Controls />
      </Page>
    </CoverArtProvider>
  );
};

render(<App />, document.querySelector('#app'));
