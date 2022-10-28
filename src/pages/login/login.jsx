import { useState } from 'react';
import { Link } from 'react-router-dom';

import {
  Button,
  Notification,
  PageRedirect,
  TextField
} from '../../components';
import { useLogin } from '../../hooks';

export const Login = () => {
  const [ email, setEmail ] = useState('');
  const [ password, setPassword ] = useState('');

  const {
    loading,
    error,
    loginWithEmailAndPassword,
    loginWithGoogle
  } = useLogin();

  function handleEmailChange({ target: { value } }) {
    setEmail(value);
  }

  function handlePasswordChange({ target: { value } }) {
    setPassword(value);
  }

  async function handleLogin(event) {
    event.preventDefault();

    await loginWithEmailAndPassword(email, password);
  }

  async function handleGoogleSignIn() {
    await loginWithGoogle();
  }

  return (
    <div className="auth__form-wrapper">
      <form className="auth__form login" onSubmit={ handleLogin }>
        <h2 className="auth__form-title">Login</h2>
        { error && <p className="firebase--error">{ error }</p> }
        <label className="form-group">
          <span>E-mail</span>
          <TextField
            type="email"
            name="email"
            required
            value={ email }
            onChange={ handleEmailChange }
          />
        </label>
        <label className="form-group">
          <span>Password</span>
          <TextField
            type="password"
            name="password"
            required
            value={ password }
            onChange={ handlePasswordChange }
          />
        </label>
        <Button variety="primary" size="lg" disabled={ loading }>
          { loading ? 'Logging in...' : 'Login' }
        </Button>
        <PageRedirect>
          <span>
            Not a member?
            <Link to="/register">Sign up.</Link>
          </span>
          <Link to="/password-reset">Forgot password?</Link>
        </PageRedirect>
        <Notification onClick={ handleGoogleSignIn }>Or login with Google</Notification>
      </form>
    </div>
  );
};
