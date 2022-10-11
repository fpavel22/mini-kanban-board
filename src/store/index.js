import { configureStore } from '@reduxjs/toolkit';
import { themeReducer } from '../features/themeSlice';
import { showAddTaskReducer } from '../features/showAddTaskModalSlice';
import { REDUCERS } from '../constants';

export const store = configureStore({
  reducer: {
    [ REDUCERS.THEME ]: themeReducer,
    [ REDUCERS.SHOW_ADD_TASK ]: showAddTaskReducer
  }
});
