import React from 'react';
import styled from 'styled-components';

import { Footer } from './Footer';

const Header = styled.header`
  display: flex;
  align-items: baseline;
  padding: 40px 0;

  & > h1 {
    font-size: 1.5rem;
    font-weight: 700;
    flex-grow: 1;
  }
`;

const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 10px;
  display: flex;
  flex-direction: column;
  min-height: 100vh;
`;

const Main = styled.main`
  flex-grow: 1;
`

export const Page = ({ children }) => {
  return (
    <Container>
      <Header>
        <h1>This playlist</h1>
      </Header>
      <Main>{children}</Main>
      <Footer>
        <p>Created by John Sylvain</p>
      </Footer>
    </Container>
  );
}
