import { Button, TextField } from '@/components';
import { BUTTON_VARIETIES, THUNK_STATUS } from '@/constants';
import { useBoardOperations, useFormState } from '@/hooks';

export const BoardForm = ({ closeModal, darkMode, user }) => {
  const [ formState, handleChange ] = useFormState({ boardName: '' });
  const { createBoard, status: localStatus } = useBoardOperations();

  const isError = localStatus === THUNK_STATUS.FAILED;
  const isLoading = localStatus === THUNK_STATUS.LOADING;

  function handleSubmit(event) {
    event.preventDefault();

    if (formState.boardName) {
      createBoard(formState.boardName, user.uid).then(() => {
        closeModal?.();
      });
    }
  }

  return (
    <form className="form board-form" onSubmit={ handleSubmit }>
      <h2 className="form__title">Create new board</h2>
      { isError && <p className="firebase--error">Could not create the board.</p> }
      <div className="form__group">
        <TextField
          darkMode={ darkMode }
          error={ isError }
          name="boardName"
          onChange={ handleChange }
          placeholder="Board name"
          value={ formState.boardName }
        />
      </div>
      <Button disabled={ isLoading } variety={ BUTTON_VARIETIES.PRIMARY }>
        { isLoading ? 'Creating your board...' : 'Create board' }
      </Button>
    </form>
  );
};
