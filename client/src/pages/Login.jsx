import React, { useState } from 'react'
import { styled } from 'styled-components';
import Header from '../ui/Header';
import { useLogin } from '../features/authentication/useLogin';
import SpinnerMini from '../ui/SpinnerMini';


const LoginLayout = styled.main`
  background-color: var(--color-grey-900);
  display: grid;
  grid-template-columns: 1fr;
  grid-template-rows: auto 1fr;
  height: 100vh;
`;

const Form = styled.form`
  display: grid;
  grid-template-columns: 40rem;
  align-content: center;
  justify-content: center;
  gap: 3.2rem;
  font-weight: 600;
`;

const GoogleIcon = styled.div`
  background-color: #C95252;
  padding: 1rem 1.2rem;
  border-radius: 10px;
  border: none;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 1rem;
  color: white;
`;

const Logo = styled.img`
  border-radius: 50%;
  width: 30px;
  height: 30px;
  background-color: #fff;
 `;

const Container = styled.div`
  display:flex;
  align-items: center;
  justify-content: center;
`
const Line = styled.hr`
   width: 100%;
   margin-right: ${(props) => (props.margin === 'right' ? '20px' : '0px')};
   margin-left: ${(props) => (props.margin === 'left' ? '20px' : '0px')};
`

const Input = styled.input`
  text-align: center;
  border-radius:10px;
  padding: 1rem 1.2rem;
  border-radius: 10px;
  border: none;
`;

const Button = styled.button`
  margin: auto;
  background: linear-gradient(97.51deg, #27EECB 9.75%, #12D2D2 92.45%);
  padding: 1.2rem 1.4rem;
  border-radius: 10px;
  border: none;
`;

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { login, isLoading } = useLogin();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!email || !password) return;
    login({ email, password }, {
      onSettled: () => {
        setEmail("");
        setPassword("");
      }
    });
  }

  return (
    <LoginLayout>
      <Header />
      <Form onSubmit={handleSubmit}>
        <GoogleIcon>
          <Logo src='https://www.freepnglogos.com/uploads/google-logo-png/google-logo-png-webinar-optimizing-for-success-google-business-webinar-13.png' />
          <span>Login with google</span>
        </GoogleIcon>
        <Container>
          <Line margin='right' />
          OR
          <Line margin='left' />
        </Container>
        <Input type='text' placeholder='Username' value={email} onChange={(e) => setEmail(e.target.value)} disabled={isLoading} />
        <Input type='password' placeholder='Password' value={password} onChange={(e) => setPassword(e.target.value)} disable={isLoading} />
        <Button type='submit'>
          {isLoading ? <SpinnerMini /> : "Login"}
        </Button>
      </Form>
    </LoginLayout>

  )
}

export default Login;