import React, { useState } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { setAlert } from '../../actions/alert';
import { register } from '../../actions/auth';
import styled from 'styled-components';
import PropTypes from 'prop-types';

import Alert from '../ui/Alert';

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
  margin-bottom: 16px;
  font-size: 18px;
  font-weight: bold;
  color: #3a3a3a;
`;

const Form = styled.form`
  margin-top: 16px;
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

const Register = ({ setAlert, register }) => {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: ''
  });

  const { username, email, password } = formData;

  const onChange = e =>
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });

  const onSubmit = e => {
    e.preventDefault();
    register({
      username,
      email,
      password
    });
  };

  return (
    <Wrapper>
      <LeftBanner />
      <Content>
        <Title>
          Welcome to <span style={{ color: '#00a3ff' }}>skillforum</span>
        </Title>
        <Subtitle>Create an account to get started</Subtitle>
        <Alert />
        <Form onSubmit={e => onSubmit(e)}>
          <FormField
            type="text"
            name="username"
            value={username}
            onChange={e => onChange(e)}
            placeholder="Username"
            required
          />
          <FormField
            type="email"
            name="email"
            value={email}
            onChange={e => onChange(e)}
            placeholder="Email"
            required
          />
          <FormField
            type="password"
            name="password"
            value={password}
            onChange={e => onChange(e)}
            placeholder="Password"
            required
            minLength="6"
          />
          <FormSubmit type="submit" value="Sign up" />
        </Form>
        <p>
          Already have an account? <Link to="/login">Login</Link>
        </p>
      </Content>
    </Wrapper>
  );
};

Register.propTypes = {
  setAlert: PropTypes.func.isRequired,
  register: PropTypes.func.isRequired
};

export default connect(
  null,
  { setAlert, register }
)(Register);
