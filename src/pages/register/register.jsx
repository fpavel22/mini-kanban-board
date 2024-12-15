import { Link } from 'react-router-dom';

import {
  Button,
  PageForm,
  TextField
} from '@components';
import { useRegisterAccount } from '@/hooks';
import { FORM_FIELDS, SIZE } from '@/constants';

const { REGISTER } = FORM_FIELDS;

export const Register = () => {
  const { loading, error, registerAccount } = useRegisterAccount();

  async function handleRegistration([ email, password ]) {
    await registerAccount(email, password);
  }

  return (
    <div className="auth__form-wrapper">
      <div className="auth__form">
        <PageForm
          loading={ loading }
          error={ error }
          fields={ REGISTER }
          className="register"
          onSubmit={ handleRegistration }
        >
          { ({
            fields,
            formState,
            formError,
            isLoading,
            handleInputChange
          }) => (
            <>
              <h2 className="auth__form-title">Sign-up a new account</h2>
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
                { isLoading ? 'Signing up...' : 'Sign-up' }
              </Button>
            </>
          ) }
        </PageForm>
        <div className="page-redirect page-redirect--center">
          <span>
            Already got an account?
            {' '}
            <Link to="/login">Log in.</Link>
          </span>
        </div>
      </div>
    </div>
  );
};
