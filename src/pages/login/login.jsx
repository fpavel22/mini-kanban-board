import { Link } from 'react-router-dom';

import {
  Button,
  Notification,
  PageForm,
  TextField
} from '@components';
import { useLogin } from '@/hooks';
import { FORM_FIELDS, SIZE } from '@/constants';

const { LOGIN } = FORM_FIELDS;

export const Login = () => {
  const {
    loading,
    error,
    loginWithEmailAndPassword,
    loginWithGoogle
  } = useLogin();

  async function handleLogin([ email, password ]) {
    await loginWithEmailAndPassword(email, password);
  }

  async function handleGoogleSignIn() {
    await loginWithGoogle();
  }

  return (
    <div className="auth__form-wrapper">
      <div className="auth__form">
        <PageForm
          loading={ loading }
          error={ error }
          fields={ LOGIN }
          className="login"
          onSubmit={ handleLogin }
        >
          { ({
            fields,
            formState,
            formError,
            isLoading,
            handleInputChange
          }) => (
            <>
              <h2 className="auth__form-title">Login</h2>
              { formError && <p className="firebase--error">{ formError }</p> }
              { fields.map((field) => (
                <label key={ field.name } className="form-group">
                  <span>{ field.label }</span>
                  <TextField
                    type={ field.type }
                    name={ field.name }
                    required
                    value={ formState[ field.name ] }
                    onChange={ handleInputChange }
                  />
                </label>
              )) }
              <Button variety="primary" size={ SIZE.LG } disabled={ isLoading }>
                { isLoading ? 'Logging in...' : 'Login' }
              </Button>
            </>
          ) }
        </PageForm>
        <div className="page-redirect">
          <span>
            Not a member?
            {' '}
            <Link to="/register">Sign up.</Link>
          </span>
          <Link to="/password-reset">Forgot password?</Link>
        </div>
        <Notification onClick={ handleGoogleSignIn }>
          Or login with Google
        </Notification>
      </div>
    </div>
  );
};
