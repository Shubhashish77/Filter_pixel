import React, { useState } from 'react'
import { styled } from 'styled-components'
import { useUser } from '../features/authentication/useUser';
import { useLogout } from '../features/authentication/useLogout';
import { useLogin } from '../features/authentication/useLogin';
import { useNavigate } from 'react-router-dom';


const Container = styled.div`
  margin: 2rem 4.8rem;
  display: flex;
  /* gap: 2.4rem; */
  align-items: center;
  justify-content: space-between;
`;

const Logo = styled.img``;
const Button = styled.button`
  background-color: var(--color-grey-0);
  padding: 12px 24px 12px 24px;
  border-radius: 10px;
  color: var(--color-brand-900);
  font-weight: 600;
  border: 0;
`;

const Header = () => {
  const navigate = useNavigate();
  const [page, setPage] = useState(window.location.pathname);
  const { logout, isLoading } = useLogout();
  // const { login, isLoading } = useLogin();
  const { isAuthenticated } = useUser();
  console.log(window.location.pathname)
  return (
    <Container>
      <Logo src='https://filterpixel.com/assets/new-index/fpLogo.svg' alt='logo' />
      {isAuthenticated ? (
        <Button disabled={isLoading} onClick={logout} >Log Out</Button>
      ) : (
        page === '/login' ? (<Button onClick={() => {
          setPage("")
          navigate("/signup");
        }}>Sign Up</Button>) : <Button onClick={() => {
          setPage("login")
          navigate("/login");
        }}>Login</Button>

      )}
    </Container>
  )
}

export default Header;