import { useState } from 'react';

import { addBoard } from '@/features/boardsSlice';
import { THUNK_STATUS } from '@/constants';

import { useDispatchUnwrapper } from './useDispatchUnwrapper';

export const useBoardOperations = () => {
  const [ status, setStatus ] = useState(THUNK_STATUS.IDLE);
  const unwrapDispatch = useDispatchUnwrapper();

  async function createBoard(pageName, createdBy) {
    setStatus(THUNK_STATUS.LOADING);

    try {
      await unwrapDispatch(addBoard({
        pageName,
        createdBy
      }));

      setStatus(THUNK_STATUS.SUCCEEDED);
    } catch (err) {
      setStatus(THUNK_STATUS.FAILED);

      throw err;
    }
  }

  return { status, createBoard };
};
