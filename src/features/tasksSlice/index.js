import { createSlice } from '@reduxjs/toolkit';
import { REDUCERS } from '../../constants';

const initialState = {
  tasksList: [],
  selectedTask: null
};

const tasksSlice = createSlice({
  name: REDUCERS.TASKS,
  initialState,
  reducers: {
    getAllTasks: (state, action) => {
      state.tasksList = action.payload;
    },
    addTask: (state, action) => {
      state.tasksList.push(action.payload);
    },
    selectTask: (state, action) => {
      state.selectedTask = action.payload;
    }
  }
});

export const { getAllTasks, addTask, selectTask } = tasksSlice.actions;

export const tasksSelector = (state) => state[ REDUCERS.TASKS ];

export const tasksReducer = tasksSlice.reducer;