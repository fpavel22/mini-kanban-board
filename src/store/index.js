import { configureStore } from '@reduxjs/toolkit';

import { boardsReducer } from '@/features/boardsSlice';
import { modalReducer } from '@/features/modalSlice';
import { tasksReducer } from '@/features/tasksSlice';
import { themeReducer } from '@/features/themeSlice';
import { userReducer } from '@/features/userSlice';

import { REDUCERS } from '@/constants';

export const store = configureStore({
  reducer: {
    [ REDUCERS.BOARDS ]: boardsReducer,
    [ REDUCERS.SHOW_MODAL ]: modalReducer,
    [ REDUCERS.TASKS ]: tasksReducer,
    [ REDUCERS.THEME ]: themeReducer,
    [ REDUCERS.USER ]: userReducer
  }
});
