import React from 'react';

import { Page } from '../components/Page';
import { Controls } from '../components/Controls';
import { CoverArt } from '../components/CoverArt';

export const Home = () => {
  return (
    <Page>
      <CoverArt />
      <Controls />
    </Page>
  );
};
