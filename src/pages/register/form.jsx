import { Button, TextField } from '@/components';
import { BUTTON_VARIETIES } from '@/constants';
import { useFormState } from '@/hooks';

export const Form = ({
  darkMode,
  error,
  loading,
  onSubmit
}) => {
  const [ formState, handleChange ] = useFormState({ email: '', password: '' });

  function handleSubmit(event) {
    event.preventDefault();

    onSubmit(formState);
  }

  return (
    <form className="register" onSubmit={ handleSubmit }>
      { error && <p className="firebase--error">{ error }</p> }
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
      <label className="form-group">
        <span>Password</span>
        <TextField
          darkMode={ darkMode }
          name="password"
          onChange={ handleChange }
          required
          type="password"
          value={ formState.password }
        />
      </label>
      <Button disabled={ loading } variety={ BUTTON_VARIETIES.PRIMARY }>
        { loading ? 'Signing in...' : 'Sign in' }
      </Button>
    </form>
  );
};
