import React, { useState, useEffect, useRef } from 'react';
import { render } from 'react-dom';

import { useDocumentTitle } from './hooks/useDocumentTitle';

import { Page } from './components/Page';
import { Art } from './components/Art';
import { Controls } from './components/Controls';
import { GlobalStyle } from './components/GlobalStyle';

import { CoverArtProvider } from './context/cover-art';

const App = () => {
  const [name, setName] = useState('');
  const [image, setImage] = useState();
  const [gradient, setGradient] = useState(0);

  useDocumentTitle(`This is${name ? `: ${name}` : ''}`);

  return (
    <CoverArtProvider>
      <GlobalStyle />
      <Page title={name}>
        <Art name={name} image={image} />
        <div>
          <Controls setName={setName} setImage={setImage} />
        </div>
      </Page>
    </CoverArtProvider>
  );
};

render(<App />, document.querySelector('#app'));
