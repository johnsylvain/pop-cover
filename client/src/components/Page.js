import React from 'react';
import styled from 'styled-components';
import { NavLink } from 'react-router-dom';

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
  display: grid;
  grid-template-columns: 40% 1fr;
  grid-gap: 15px;

  @media (max-width: 600px) {
    grid-template-columns: 1fr;
  }
`;

export const Page = ({ children }) => {
  return (
    <Container>
      <Header>
        <h1>This playlist</h1>
        <nav>
          <NavLink to="/">Home</NavLink>
          <NavLink to="/about">About</NavLink>
        </nav>
      </Header>
      <Main>{children}</Main>
      <Footer>
        <p>Created by John Sylvain</p>
      </Footer>
    </Container>
  );
};
