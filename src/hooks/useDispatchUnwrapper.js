import { unwrapResult } from '@reduxjs/toolkit';
import { useDispatch } from 'react-redux';

export const useDispatchUnwrapper = () => {
  const dispatch = useDispatch();

  async function unwrapDispatch(action) {
    const thunkResponse = await dispatch(action);

    const result = await unwrapResult(thunkResponse);

    return result;
  }

  return unwrapDispatch;
};
