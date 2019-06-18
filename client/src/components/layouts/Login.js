import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

const Wrapper = styled.section`
  display: flex;
  margin-top: 16px;
  margin-left: 16px;
  width: 781px;
  background: #ffffff;
`;

const LeftBanner = styled.div`
  background: #00a3ff;
  width: 128px;
`;

const Content = styled.div`
  display: flex;
  flex-direction: column;
  margin-left: 16px;
`;

const Title = styled.div`
  font-size: 36px;
  font-weight: bold;
  color: #3a3a3a;
  margin-top: 64px;
  margin-bottom: 16px;
`;

const Subtitle = styled.div`
  font-size: 18px;
  font-weight: bold;
  color: #3a3a3a;
`;

const Form = styled.form`
  margin-top: 32px;
  display: flex;
  flex-direction: column;
`;

const FormField = styled.input`
  margin-bottom: 8px;
  padding: 8px;
  height: 32px;
  width: 512px;
  font-size: 14px;
  font-family: 'Montserrat', sans-serif;
  border: 2px solid #cccccc;
  border-radius: 5px;
`;

const FormSubmit = styled.input`
  margin-top: 24px;
  padding: 8px;
  height: 40px;
  width: 128px;
  font-size: 14px;
  font-family: 'Montserrat', sans-serif;
  font-weight: bold;
  border: none;
  border-radius: 5px;
  background: #00a3ff;
  color: white;
  :hover {
    cursor: pointer;
    opacity: 0.8;
  }
`;

const Login = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });

  const { email, password } = formData;

  const onChange = e =>
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });

  const onSubmit = e => {
    e.preventDefault();
    console.log(formData);
  };

  return (
    <Wrapper>
      <LeftBanner />
      <Content>
        <Title>Welcome back</Title>
        <Subtitle>Log in to continue</Subtitle>
        <Form onSubmit={e => onSubmit(e)}>
          <FormField
            type="text"
            name="email"
            value={email}
            onChange={e => onChange(e)}
            placeholder="Email"
            required
          />
          <FormField
            type="text"
            name="password"
            value={password}
            onChange={e => onChange(e)}
            placeholder="Password"
            required
            minLength="6"
          />
          <FormSubmit type="submit" value="Login" />
        </Form>
        <p>
          Don't have an account yet? <Link to="/register">Sign up</Link>
        </p>
      </Content>
    </Wrapper>
  );
};

export default Login;
