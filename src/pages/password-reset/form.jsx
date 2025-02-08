import { Button, TextField } from '@/components';
import { SIZE } from '@/constants';
import { useFormState } from '@/hooks';

export const Form = ({
  darkMode,
  loading,
  error,
  success,
  onSubmit
}) => {
  const [ formState, handleChange ] = useFormState({ email: '' });

  async function handleSubmit(event) {
    event.preventDefault();

    await onSubmit(formState);
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
      <Button disabled={ loading } size={ SIZE.LG } variety="primary">
        { loading ? 'Please wait...' : 'Reset' }
      </Button>
    </form>
  );
};
