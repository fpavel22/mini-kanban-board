import { configureStore } from '@reduxjs/toolkit';
import { pagesReducer } from '../features/pagesSlice';
import { themeReducer } from '../features/themeSlice';
import { showModalReducer } from '../features/showModalSlice';
import { tasksReducer } from '../features/tasksSlice';
import { userReducer } from '../features/userSlice';
import { REDUCERS } from '../constants';

export const store = configureStore({
  reducer: {
    [ REDUCERS.PAGES]: pagesReducer,
    [ REDUCERS.THEME ]: themeReducer,
    [ REDUCERS.SHOW_MODAL ]: showModalReducer,
    [ REDUCERS.TASKS ]: tasksReducer,
    [ REDUCERS.USER ]: userReducer
  }
});
