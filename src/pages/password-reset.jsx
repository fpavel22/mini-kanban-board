import { Link } from 'react-router-dom';

import { PATHS } from '@/constants';
import { usePasswordReset } from '@/hooks';

import { Form } from './password-reset/form';

export const PasswordReset = () => {
  const {
    loading,
    error,
    success,
    passwordReset
  } = usePasswordReset();

  return (
    <div className="auth__form-wrapper">
      <div className="auth__form">
        <h2 className="auth__form-title">Password reset</h2>
        <Form
          loading={ loading }
          error={ error }
          success={ success }
          onSubmit={ passwordReset }
        />
        <div className="page-redirect page-redirect--center">
          <Link to={ PATHS.LOGIN }>Back to login.</Link>
        </div>
      </div>
    </div>
  );
};
