import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { v4 as uuidv4 } from 'uuid';

import { Button } from '../button';
import { TextField } from '../text-field';
import { addBoard } from '../../features/boardsSlice';
import { toggleBoardForm } from '../../features/showModalSlice';
import { userSelector } from '../../features/userSlice';
import { useAddDocument } from '../../hooks';

export const BoardForm = () => {
  const [ boardName, setBoardName ] = useState('');
  const user = useSelector(userSelector);
  const dispatch = useDispatch();

  const { loading, error, addNewDoc } = useAddDocument('boards');

  function handleChange({ target: { value } }) {
    setBoardName(value);
  }

  async function addNewBoard(event) {
    event.preventDefault();

    const newBoard = {
      createdBy: user.uid,
      path: uuidv4(),
      pageName: boardName
    };

    await addNewDoc(newBoard);
    dispatch(addBoard(newBoard));
    dispatch(toggleBoardForm(false));
  };

  return (
    <form onSubmit={ addNewBoard }>
      <h2>Create new board</h2>
      <div className="form-group">
        <TextField placeholder="Board name"
            type="text"
            value={ boardName }
            onChange={ handleChange } />
      </div>
      <Button type="primary" size="lg">Create board</Button>
    </form>
  );
}