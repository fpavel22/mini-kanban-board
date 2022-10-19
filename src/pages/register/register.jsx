import { useState } from 'react';
import { Link } from 'react-router-dom';

import { Button, TextField } from "../../components";
import { useRegisterAccount } from '../../hooks';

export const Register = () => {
  const [ email, setEmail ] = useState('');
  const [ password, setPassword ] = useState('');
  const [ username, setUsername ] = useState('');

  const { loading, error, registerAccount } = useRegisterAccount();

  function handleEmailChange({ target: { value } }) {
    setEmail(value);
  }

  function handlePasswordChange({ target: { value } }) {
    setPassword(value);
  }

  function handleUsernameChange({ target: { value } }) {
    setUsername(value);
  }

  function resetInputs() {
    setEmail('');
    setPassword('');
    setUsername('');
  }

  async function handleRegistration(event) {
    event.preventDefault();

    await registerAccount(email, password);
  };

  return (
    <div className="auth__form-wrapper">
      <form className="auth__form register" onSubmit={ handleRegistration }>
        <h2 className="auth__form-title">Sign-up a new account</h2>
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
        <label className="form-group">
          <span>Username</span>
          <TextField name="username"
              value={ username }
              onChange={ handleUsernameChange } />
        </label>
        <Button type="primary" size="lg" disabled={ loading }>
          { loading ? 'Signing up...' : 'Sign-up' }
        </Button>
        <p className="form__alt-option">Already got an account? <Link to="/login">Log in.</Link></p>
      </form>
    </div>
  );
};
