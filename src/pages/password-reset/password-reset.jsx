import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

import { Button, TextField } from '../../components';
import { usePasswordReset } from '../../hooks';

export const PasswordReset = () => {
  const [ email, setEmail ] = useState('');
  const { loading, error, success, passwordReset } = usePasswordReset();

  function handleEmailChange({ target: { value } }) {
    setEmail(value);
  }
  
  async function handleRecovery(event) {
    event.preventDefault();
    await passwordReset(email);
  }

  useEffect(() => {
    if (!error && success) {
      setEmail('');
    }
  }, [ error, success ]);

  return (
    <div className="auth__form-wrapper">
      <form className="auth__form login" onSubmit={ handleRecovery }>
        <h2 className="auth__form-title">Password reset</h2>
        { error && <p className="firebase--error">{ error }</p> }
        { success && (
          <div className="firebase--success">
            <p>Your request has been successful, check your e-mail.</p>
          </div>
        ) }
        <label className="form-group">
          <span>E-mail</span>
          <TextField type="email"
              name="email"
              required
              value={ email }
              onChange={ handleEmailChange } />
        </label>
        <Button type="primary" size="lg" disabled={ loading }>
          { loading ? 'Please wait...' : 'Send e-mail' }
        </Button>
        <p className="form__alt-option">
          <Link to="/login">Back to login.</Link>
        </p>
      </form>
    </div>
  );
}
