import { useState } from 'react';

import { addBoard } from '@/features/boardsSlice';
import { THUNK_STATUS } from '@/constants';

import { useDispatchUnwrapper } from './useDispatchUnwrapper';

export const useCreateBoard = () => {
  const [ status, setStatus ] = useState(THUNK_STATUS.IDLE);
  const unwrapDispatch = useDispatchUnwrapper();

  async function create(pageName, createdBy) {
    setStatus(THUNK_STATUS.LOADING);

    try {
      const boardData = {
        pageName,
        createdBy
      };

      await unwrapDispatch(addBoard(boardData));

      setStatus(THUNK_STATUS.IDLE);
    } catch (err) {
      setStatus(THUNK_STATUS.FAILED);

      throw err;
    }
  }

  return [ status, create ];
};
