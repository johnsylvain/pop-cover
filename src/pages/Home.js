import React from 'react';

import { useDocumentTitle } from '../hooks/useDocumentTitle';
import { useCoverArt } from '../context/cover-art';

import { CoverArt } from '../components/CoverArt';
import { Controls } from '../components/Controls';
import { Page } from '../components/Page';

export const Home = () => {
  const [{ name }] = useCoverArt();
  useDocumentTitle(`This is${name ? `: ${name}` : ''}`);

  return (
    <Page>
      <CoverArt />
      <Controls />
    </Page>
  );
};
