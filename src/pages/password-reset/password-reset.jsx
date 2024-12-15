import { Link } from 'react-router-dom';

import {
  Button,
  PageForm,
  TextField
} from '@components';
import { usePasswordReset } from '@/hooks';
import { FORM_FIELDS, SIZE } from '@/constants';

const { RESET } = FORM_FIELDS;

export const PasswordReset = () => {
  const {
    loading,
    error,
    success,
    passwordReset
  } = usePasswordReset();

  async function handleRecovery([ email ]) {
    await passwordReset(email);
  }

  return (
    <div className="auth__form-wrapper">
      <div className="auth__form">
        <PageForm
          loading={ loading }
          error={ error }
          success={ success }
          fields={ RESET }
          className="reset"
          onSubmit={ handleRecovery }
        >
          { ({
            fields,
            formState,
            formError,
            formSuccess,
            isLoading,
            handleInputChange
          }) => (
            <>
              <h2 className="auth__form-title">Password reset</h2>
              { formError && <p className="firebase--error">{ formError }</p> }
              { formSuccess && (
                <div className="firebase--success">
                  <p>Your request has been successful, check your e-mail.</p>
                </div>
              ) }
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
                { isLoading ? 'Please wait...' : 'Reset' }
              </Button>
            </>
          ) }
        </PageForm>
        <div className="page-redirect page-redirect--center">
          <Link to="/login">Back to login.</Link>
        </div>
      </div>
    </div>
  );
};
