import { configureStore } from '@reduxjs/toolkit';
import { themeReducer } from '../features/themeSlice';
import { REDUCERS } from '../constants';

export const store = configureStore({
  reducer: {
    [ REDUCERS.THEME ]: themeReducer
  }
});
