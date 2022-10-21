import { createSlice } from '@reduxjs/toolkit';
import { REDUCERS, INITIAL_TASK_FORM } from '../../constants';

const initialState = {
  boardForm: false,
  taskForm: INITIAL_TASK_FORM,
  taskView: false,
  taskDelete: false
};

const showModalSlice = createSlice({
  name: REDUCERS.SHOW_MODAL,
  initialState,
  reducers: {
    toggleBoardForm: (state, action) => {
      state.boardForm = action.payload;
      state.taskForm = INITIAL_TASK_FORM;
      state.taskView = false;
      state.taskDelete = false;
    },
    toggleTaskForm: (state, action) => {
      state.boardForm = false;
      state.taskForm = action.payload;
      state.taskView = false;
      state.taskDelete = false;
    },
    toggleTaskView: (state, action) => {
      state.boardForm = false;
      state.taskForm = INITIAL_TASK_FORM;
      state.taskView = action.payload;
      state.taskDelete = false;
    },
    toggleTaskDelete: (state, action) => {
      state.boardForm = false;
      state.taskForm = INITIAL_TASK_FORM;
      state.taskView = false;
      state.taskDelete = action.payload;
    },
    hideAllContent: (state) => {
      state.boardForm = false;
      state.taskForm = INITIAL_TASK_FORM;
      state.taskView = false;
      state.taskDelete = false;
    }
  }
});

export const {
  toggleBoardForm,
  toggleTaskForm,
  toggleTaskView,
  toggleTaskDelete,
  hideAllContent
} = showModalSlice.actions;

export const showModalSelector = (state) => state[ REDUCERS.SHOW_MODAL ];

export const showModalReducer = showModalSlice.reducer;