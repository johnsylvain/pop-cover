import React from 'react';

import { Page } from '../components/Page';
import { Controls } from '../components/Controls';
import { CoverArt } from '../components/CoverArt';

import { SnackbarProvider } from '../context/snackbar';

export const Home = () => {
  return (
    <SnackbarProvider>
      <Page>
        <CoverArt />
        <Controls />
      </Page>
    </SnackbarProvider>
  );
};
