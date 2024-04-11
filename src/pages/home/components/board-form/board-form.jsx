import { useState } from 'react';

import { PageForm } from '@components/page-form';
import { Button, TextField } from '@components/ui';
import { THUNK_STATUS, FORM_FIELDS } from '@/constants';

const { BOARD_FORM } = FORM_FIELDS;

export const BoardForm = ({ addBoard = async () => {}, closeModal = () => {} }) => {
  const [ localStatus, setLocalStatus ] = useState(THUNK_STATUS.IDLE);

  async function handleSubmit([ boardName ]) {
    if (boardName) {
      try {
        setLocalStatus(THUNK_STATUS.LOADING);

        const boardData = {
          pageName: boardName
        };

        await addBoard(boardData);

        setLocalStatus(THUNK_STATUS.IDLE);
        closeModal();
      } catch (error) {
        setLocalStatus(THUNK_STATUS.FAILED);
      }
    }
  }

  return (
    <PageForm
      loading={ localStatus === THUNK_STATUS.LOADING }
      error={ localStatus === THUNK_STATUS.FAILED }
      fields={ BOARD_FORM }
      className="form board-form"
      onSubmit={ handleSubmit }
    >
      { ({
        fields,
        formState,
        formError,
        isLoading,
        handleInputChange
      }) => (
        <>
          <h2 className="form__title">Create new board</h2>
          { fields.map((field) => (
            <div key={ field.name } className="form__group">
              <TextField
                name={ field.name }
                placeholder={ field.label }
                value={ formState[ field.name ] }
                error={ formError }
                onChange={ handleInputChange }
              />
            </div>
          )) }
          <Button variety="primary" disabled={ isLoading }>
            { isLoading ? 'Creating your board...' : 'Create board' }
          </Button>
        </>
      ) }
    </PageForm>
  );
};
