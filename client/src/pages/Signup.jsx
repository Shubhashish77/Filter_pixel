import React, { useState } from 'react'
import { styled } from 'styled-components';
import Header from '../ui/Header';
import { useLogin } from '../features/authentication/useLogin';
import SpinnerMini from '../ui/SpinnerMini';
import { useSignup } from '../features/authentication/useSignup';


const SignupLayout = styled.main`
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

const Signup = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const { signup, isLoading } = useSignup();

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!email || !password) return;
        signup({ email, password }, {
            onSettled: () => {
                setEmail("");
                setPassword("");
            }
        });
    }

    return (
        <SignupLayout>
            <Header />
            <Form onSubmit={handleSubmit}>
                <Input type='text' placeholder='email' value={email} onChange={(e) => setEmail(e.target.value)} disabled={isLoading} />
                <Input type='password' placeholder='Password' value={password} onChange={(e) => setPassword(e.target.value)} disable={isLoading} />
                <Button type='submit'>
                    {isLoading ? <SpinnerMini /> : "Signup"}
                </Button>
            </Form>
        </SignupLayout>
    )
}

export default Signup;