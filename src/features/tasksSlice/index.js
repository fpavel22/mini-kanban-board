import { createSlice } from '@reduxjs/toolkit';
import { REDUCERS } from '../../constants';

const initialState = [];

const tasksSlice = createSlice({
  name: REDUCERS.TASKS,
  initialState,
  reducers: {
    fetchTasks: (_, action) => action.payload,
    addTask: (state, action) => {
      state.push(action.payload);
    }
  }
});

export const { fetchTasks, addTask } = tasksSlice.actions;

export const tasksSelector = (state) => state[ REDUCERS.TASKS ];

export const tasksReducer = tasksSlice.reducer;