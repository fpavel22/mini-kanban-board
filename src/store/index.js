import { configureStore } from '@reduxjs/toolkit';
import { themeReducer } from '../features/themeSlice';
import { showModalReducer } from '../features/showModalSlice';
import { tasksReducer } from '../features/tasksSlice';
import { REDUCERS } from '../constants';

export const store = configureStore({
  reducer: {
    [ REDUCERS.THEME ]: themeReducer,
    [ REDUCERS.SHOW_MODAL ]: showModalReducer,
    [ REDUCERS.TASKS ]: tasksReducer
  }
});
