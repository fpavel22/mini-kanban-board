import { Link } from 'react-router-dom';

import { PATHS } from '@/constants';
import { useRegisterAccount } from '@/hooks';

import { Form } from './register/form';

export const Register = () => {
  const { error, loading, registerAccount } = useRegisterAccount();

  return (
    <div className="auth__form-wrapper">
      <div className="auth__form">
        <h2 className="auth__form-title">Sign-up a new account</h2>
        <Form error={ error } loading={ loading } onSubmit={ registerAccount } />
        <div className="page-redirect page-redirect--center">
          <span>
            Already got an account?
            {' '}
            <Link to={ PATHS.LOGIN }>Log in.</Link>
          </span>
        </div>
      </div>
    </div>
  );
};
