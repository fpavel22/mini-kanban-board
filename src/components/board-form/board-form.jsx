import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { v4 as uuidv4 } from 'uuid';

import { Button } from '../button';
import { TextField } from '../text-field';
import { addBoard } from '../../features/boardsSlice';
import { toggleBoardForm } from '../../features/showModalSlice';
import { userSelector } from '../../features/userSlice';
import { useSetDocument } from '../../hooks';
import { FIREBASE_COLLECTIONS } from '../../constants';

export const BoardForm = () => {
  const [ boardName, setBoardName ] = useState('');
  const [ submitError, setSubmitError ] = useState(null);

  const user = useSelector(userSelector);
  const dispatch = useDispatch();
  const { loading, setDocument } = useSetDocument(FIREBASE_COLLECTIONS.BOARDS);

  function handleChange({ target: { value } }) {
    setBoardName(value);
  }

  async function addNewBoard(event) {
    event.preventDefault();

    if (!boardName) {
      setSubmitError(true);
    } else {
      const id = uuidv4();
      const newBoard = {
        id,
        createdBy: user.uid,
        path: id,
        pageName: boardName
      };
  
      await setDocument(id, newBoard);
      dispatch(addBoard(newBoard));
      dispatch(toggleBoardForm(false));
    }
  };

  return (
    <form className="form" onSubmit={ addNewBoard }>
      <h2 className="form__title">Create new board</h2>
      <div className="form__group">
        <TextField placeholder="Board name"
            type="text"
            error={ submitError }
            value={ boardName }
            onChange={ handleChange } />
      </div>
      <Button type="primary" disabled={ loading }>
        { loading ? 'Creating board...': 'Create board' }
      </Button>
    </form>
  );
}