import { useState } from "react";
import { Link } from 'react-router-dom';

import { Button, TextField } from "../../components";
import { useLogin } from "../../hooks";

export const Login = () => {
  const [ email, setEmail ] = useState('');
  const [ password, setPassword ] = useState('');

  const { loading, error, login } = useLogin();

  function handleEmailChange({ target: { value } }) {
    setEmail(value);
  };

  function handlePasswordChange({ target: { value } }) {
    setPassword(value);
  };

  async function handleLogin(event) {
    event.preventDefault();

    await login(email, password);
  }

  return (
    <div className="auth__form-wrapper">
      <form className="auth__form login" onSubmit={ handleLogin }>
        <h2 className="auth__form-title">Login</h2>
        <label className="form-group">
          <span>E-mail</span>
          <TextField type="email"
              name="email"
              value={ email }
              onChange={ handleEmailChange } />
        </label>
        <label className="form-group">
          <span>Password</span>
          <TextField type="password"
              name="password"
              value={ password }
              onChange={ handlePasswordChange } />
        </label>
        { error && <p className="firebase--error">{ error }</p> }
        <Button type="primary" size="lg" disabled={ loading }>
          { loading ? 'Logging in...' : 'Login' }
        </Button>
        <p className="form__alt-option">
          Don't have an account?
          <Link to="/register">Register a new account.</Link>
        </p>
      </form>
    </div>
  );
};
