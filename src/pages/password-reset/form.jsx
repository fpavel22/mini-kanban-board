import { Button, TextField } from '@/components';
import { BUTTON_VARIETIES } from '@/constants';
import { useFormState } from '@/hooks';

export const Form = ({
  darkMode,
  loading,
  error,
  success,
  onSubmit
}) => {
  const [ formState, handleChange ] = useFormState({ email: '' });

  function handleSubmit(event) {
    event.preventDefault();

    onSubmit(formState);
  }

  return (
    <form className="reset" onSubmit={ handleSubmit }>
      { error && <p className="firebase--error">{ error }</p> }
      { success && (
        <div className="firebase--success">
          <p>Your request has been successful, check your e-mail.</p>
        </div>
      ) }
      <label className="form-group">
        <span>E-mail</span>
        <TextField
          darkMode={ darkMode }
          name="email"
          onChange={ handleChange }
          required
          type="email"
          value={ formState.email }
        />
      </label>
      <Button disabled={ loading } variety={ BUTTON_VARIETIES.PRIMARY }>
        { loading ? 'Please wait...' : 'Reset' }
      </Button>
    </form>
  );
};
