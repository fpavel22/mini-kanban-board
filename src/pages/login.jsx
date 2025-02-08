import { Link } from 'react-router-dom';

import { Notification } from '@/components';
import { PATHS } from '@/constants';
import { useLogin } from '@/hooks';

import { Form } from './login/form';

export const Login = () => {
  const {
    error,
    loading,
    loginWithEmailAndPassword,
    loginWithGoogle
  } = useLogin();

  return (
    <div className="auth__form-wrapper">
      <div className="auth__form">
        <h2 className="auth__form-title">Login</h2>
        <Form error={ error } loading={ loading } onSubmit={ loginWithEmailAndPassword } />
        <div className="page-redirect">
          <span>
            Not a member?
            {' '}
            <Link to={ PATHS.REGISTER }>Sign up.</Link>
          </span>
          <Link to={ PATHS.RESET }>Forgot password?</Link>
        </div>
        <Notification onClick={ loginWithGoogle }>
          Or login with Google
        </Notification>
      </div>
    </div>
  );
};
