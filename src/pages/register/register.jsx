import { useState } from 'react';
import { Button, TextField } from "../../components";

import './register.scss';

export const Register = () => {
  const [ authFormState, setAuthFormState ] = useState({
    email: '',
    password: '',
    username: ''
  });

  const { email, password, username } = authFormState;

  function handleInputsChange({ target: { name, value } }) {
    setAuthFormState((prevState) => ({ ...prevState, [ name ]: value }));
  };

  function handleRegistration(event) {
    event.preventDefault();
  };

  return (
    <div className="auth__form-wrapper">
      <form className="auth__form register" onSubmit={ handleRegistration }>
        <h2 className="auth__form-title">Sign-up a new account</h2>
        <label className="form-group">
          <span>E-mail</span>
          <TextField type="email"
              name="email"
              value={ email }
              onChange={ handleInputsChange } />
        </label>
        <label className="form-group">
          <span>Password</span>
          <TextField type="password"
              name="password"
              value={ password }
              onChange={ handleInputsChange } />
        </label>
        <label className="form-group">
          <span>Username</span>
          <TextField name="username"
              value={ username }
              onChange={ handleInputsChange } />
        </label>
        <Button type="primary" size="lg">Sign-up</Button>
      </form>
    </div>
  );
};
