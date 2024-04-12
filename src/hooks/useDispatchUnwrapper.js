import { useDispatch } from 'react-redux';
import { unwrapResult } from '@reduxjs/toolkit';

export const useDispatchUnwrapper = () => {
  const dispatch = useDispatch();

  async function unwrapDispatch(action) {
    const thunkResponse = await dispatch(action);

    const results = await unwrapResult(thunkResponse);

    return results;
  }

  return unwrapDispatch;
};
