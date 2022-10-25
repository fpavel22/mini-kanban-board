import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { v4 as uuidv4 } from 'uuid';

import { Button } from '../button';
import { TextField } from '../text-field';
import { boardsSliceSelectors, addBoard } from '../../features/boardsSlice';
import { toggleBoardForm } from '../../features/modalSlice';
import { userSelector } from '../../features/userSlice';
import { useSetDocument } from '../../hooks';
import { FIREBASE_COLLECTIONS, THUNK_STATUS } from '../../constants';

export const BoardForm = () => {
  const [ boardName, setBoardName ] = useState('');
  const [ localStatus, setLocalStatus ] = useState(THUNK_STATUS.IDLE);

  const user = useSelector(userSelector);
  const dispatch = useDispatch();

  const { setDocument } = useSetDocument(FIREBASE_COLLECTIONS.BOARDS);

  function handleChange({ target: { value } }) {
    setBoardName(value);
  }

  async function handleSubmit(event) {
    event.preventDefault();

    if (boardName) {
      try {
        setLocalStatus(THUNK_STATUS.LOADING);
        const thunkArgs = {
          setDocument,
          boardData: {
            pageName: boardName,
            createdBy: user.uid
          }
        };
  
        await dispatch(addBoard(thunkArgs));
      } catch(error) {
        setLocalStatus(THUNK_STATUS.FAILED);
      } finally {
        setLocalStatus(THUNK_STATUS.IDLE);

        dispatch(toggleBoardForm(false));
        setBoardName('');
      }
    } else {
      setLocalStatus(THUNK_STATUS.FAILED);
    }
  };

  return (
    <form className="form" onSubmit={ handleSubmit }>
      <h2 className="form__title">Create new board</h2>
      <div className="form__group">
        <TextField placeholder="Board name"
            type="text"
            error={ localStatus === THUNK_STATUS.FAILED }
            value={ boardName }
            onChange={ handleChange } />
      </div>
      <Button type="primary" disabled={ localStatus === THUNK_STATUS.LOADING }>
        { localStatus === THUNK_STATUS.LOADING ? 'Creating board...': 'Create board' }
      </Button>
    </form>
  );
}