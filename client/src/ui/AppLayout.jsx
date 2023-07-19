import React from 'react'
import { Outlet } from 'react-router-dom'
import { styled } from 'styled-components';
import Header from './Header';

const StyledAppLayout = styled.div`
  background-color: var(--color-grey-900);
  display: grid;
  grid-template-columns: 1fr;
  grid-template-rows: auto 1fr;
  min-height: 100vh;
`;

const Main = styled.main`

  padding: 2rem 4.8rem;
  /* overflow: scroll; */

  /* background-color: yellow; */
`;

const Container = styled.div`
  /* max-width: 120rem; */
  /* margin: 0 auto; */
  display: flex;
  flex-direction: column;
  /* gap: 3.2rem; */
`;


const AppLayout = () => {
  return (
    <StyledAppLayout>
      <Header />
      <Main>
        <Container>
          <Outlet />
        </Container>
      </Main>
    </StyledAppLayout>
  )
}

export default AppLayout