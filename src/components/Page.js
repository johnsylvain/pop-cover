import React from 'react';
import styled from 'styled-components';

import bg from '../styles/resources/bg-swoop.svg';

import { Container } from './Container';
import { Header } from './Header';

const Footer = styled.footer`
  font-size: 0.8rem;
  padding: 30px 0px;
  flex: 1;
  display: flex;
  align-items: flex-end;
  justify-content: start;
  background: #f2f2fb;
  color: #c5c5ec;
`;

const Main = styled.main`
  display: grid;
  grid-template-columns: 40% 1fr;
  grid-gap: 20px;
  position: relative;
  z-index: 100;

  @media (max-width: 600px) {
    grid-template-columns: 1fr;
  }
`;

const Wave = styled.div`
  background: url(${bg}) no-repeat;
  height: 380px;
  width: 100%;
  margin-top: -380px;
  background-size: cover;
  background-position: center;
  z-index: -100;
`;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
`;

export const Page = ({ children }) => {
  return (
    <Wrapper>
      <Container>
        <Header></Header>
        <Main>{children}</Main>
      </Container>
      <Wave></Wave>
      <Footer>
        <Container>
          <p>&copy; John Sylvain {new Date().getFullYear()}</p>
        </Container>
      </Footer>
    </Wrapper>
  );
};
