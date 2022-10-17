import { useState } from "react";
import { Button, TextField } from "../../components";

import './login.scss';

export const Login = () => {
  const [ authFormState, setAuthFormState ] = useState({
    email: '',
    password: ''
  });

  const { email, password } = authFormState;

  function handleInputsChange({ target: { name, value } }) {
    setAuthFormState((prevState) => ({ ...prevState, [ name ]: value }));
  };

  function handleLogin(event) {
    event.preventDefault();
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
              onChange={ handleInputsChange } />
        </label>
        <label className="form-group">
          <span>Password</span>
          <TextField type="password"
              name="password"
              value={ password }
              onChange={ handleInputsChange } />
        </label>
        <Button type="primary" size="lg">Login</Button>
      </form>
    </div>
  );
};
