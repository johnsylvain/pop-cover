import React from 'react';
import styled from 'styled-components';

const Header = styled.header`
  display: flex;
  align-items: baseline;
  padding: 40px 0;
`;

const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 10px;
`

export const Page = ({ children }) => {
  return (
    <Container>
      <Header>
        <h1>This is</h1>
        <nav>
          <ul>
            <li>Home</li>
            <li>About</li>
            <li>Login</li>
          </ul>
        </nav>
      </Header>
      <main>{children}</main>
    </Container>
  );
}
