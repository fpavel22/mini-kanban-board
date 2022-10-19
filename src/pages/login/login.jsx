import { useState } from "react";
import { Link } from 'react-router-dom';

import { Button, Notification, TextField } from "../../components";
import { useLogin, useSignInWithGoogle } from "../../hooks";

export const Login = () => {
  const [ email, setEmail ] = useState('');
  const [ password, setPassword ] = useState('');

  const { loading, error, login } = useLogin();
  const { signInWithGoogle } = useSignInWithGoogle();

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

  async function handleGoogleSignIn() {
    await signInWithGoogle();
  }

  return (
    <div className="auth__form-wrapper">
      <form className="auth__form login" onSubmit={ handleLogin }>
        <h2 className="auth__form-title">Login</h2>
        { error && <p className="firebase--error">{ error }</p> }
        <label className="form-group">
          <span>E-mail</span>
          <TextField type="email"
              name="email"
              required
              value={ email }
              onChange={ handleEmailChange } />
        </label>
        <label className="form-group">
          <span>Password</span>
          <TextField type="password"
              name="password"
              required
              value={ password }
              onChange={ handlePasswordChange } />
        </label>
        <Button type="primary" size="lg" disabled={ loading }>
          { loading ? 'Logging in...' : 'Login' }
        </Button>
        <div className="form__alt-option">
          <p>
            Not a member? <Link to="/register">Sign up.</Link>
          </p>
          <p>
            <Link to="/password-reset">Forgot password?</Link>
          </p>
        </div>
        <Notification onClick={ handleGoogleSignIn }>Sign in with Google</Notification>
      </form>
    </div>
  );
};
