import React from 'react';
import { render } from 'react-dom';

import { useDocumentTitle } from './hooks/useDocumentTitle';

import { Page } from './components/Page';
import { Art } from './components/Art';
import { Controls } from './components/Controls';
import { GlobalStyle } from './components/GlobalStyle';

import { CoverArtProvider } from './context/cover-art';

const App = () => {
  useDocumentTitle(`This is${name ? `: ${name}` : ''}`);

  return (
    <CoverArtProvider>
      <GlobalStyle />
      <Page>
        <Art />
        <Controls />
      </Page>
    </CoverArtProvider>
  );
};

render(<App />, document.querySelector('#app'));
