import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { Button, TextField } from '@components/ui';
import { addBoard } from '@/features/boardsSlice';
import { closeModal } from '@/features/modalSlice';
import { userSelector } from '@/features/userSlice';

import { THUNK_STATUS } from '@/constants';

export const BoardForm = () => {
  const [ boardName, setBoardName ] = useState('');
  const [ localStatus, setLocalStatus ] = useState(THUNK_STATUS.IDLE);

  const user = useSelector(userSelector);

  const dispatch = useDispatch();

  function handleChange({ target: { value } }) {
    setBoardName(value);
  }

  async function handleSubmit(event) {
    event.preventDefault();

    if (boardName) {
      try {
        setLocalStatus(THUNK_STATUS.LOADING);

        const boardData = {
          pageName: boardName,
          createdBy: user.uid
        };

        await dispatch(addBoard(boardData));
      } catch (error) {
        setLocalStatus(THUNK_STATUS.FAILED);
      } finally {
        setLocalStatus(THUNK_STATUS.IDLE);
        dispatch(closeModal());
        setBoardName('');
      }
    }
  }

  return (
    <form className="form board-form" onSubmit={ handleSubmit }>
      <h2 className="form__title">Create new board</h2>
      <div className="form__group">
        <TextField
          placeholder="Board name"
          type="text"
          value={ boardName }
          error={ localStatus === THUNK_STATUS.FAILED }
          onChange={ handleChange }
        />
      </div>
      <Button variety="primary" disabled={ localStatus === THUNK_STATUS.LOADING }>
        { localStatus === THUNK_STATUS.LOADING ? 'Creating board...' : 'Create board' }
      </Button>
    </form>
  );
};
