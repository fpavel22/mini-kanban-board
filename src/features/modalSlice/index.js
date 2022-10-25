import { createSlice } from '@reduxjs/toolkit';
import { REDUCERS } from '../../constants';

const initialState = {
  boardForm: false,
  taskForm: {
    addNewTask: false,
    editTask: false
  },
  taskView: false,
  taskDelete: false
};

const modalSlice = createSlice({
  name: REDUCERS.SHOW_MODAL,
  initialState,
  reducers: {
    toggleBoardForm(_, action) {
      return {
        ...initialState,
        boardForm: action.payload
      }
    },
    toggleTaskForm(_, action) {
      return {
        ...initialState,
        taskForm: action.payload
      }
    },
    toggleTaskView(_, action) {
      return {
        ...initialState,
        taskView: action.payload
      }
    },
    toggleTaskDelete(_, action) {
      return {
        ...initialState,
        taskDelete: action.payload
      }
    },
    hideAllContent(_) {
      return initialState;
    }
  }
});

export const {
  toggleBoardForm,
  toggleTaskForm,
  toggleTaskView,
  toggleTaskDelete,
  hideAllContent
} = modalSlice.actions;

export const modalSelector = (state) => state[ REDUCERS.SHOW_MODAL ];

export const isModalVisible = (state) => {
  return Object.values(state[ REDUCERS.SHOW_MODAL ])
    .map((item) => typeof item === 'object' ? Object.values(item) : item)
    .flat()
    .some(Boolean);
};

export const modalReducer = modalSlice.reducer;