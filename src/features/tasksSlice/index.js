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
    updateTask: (state, action) => {
      const updatedTaskId = state.tasksList.findIndex((task) => task.id === action.payload.id);

      state.tasksList[ updatedTaskId ] = action.payload;
      state.selectedTask = action.payload;
    },
    deleteTask: (state, action) => {
      const filteredTasks = state.tasksList.filter(({ id }) => id !== action.payload);

      state.tasksList = filteredTasks;
      state.selectedTask = null;
    },
    selectTask: (state, action) => {
      state.selectedTask = action.payload;
    }
  }
});

export const { getAllTasks, addTask, updateTask, deleteTask, selectTask } = tasksSlice.actions;

export const tasksSelector = (state) => state[ REDUCERS.TASKS ];

export const tasksReducer = tasksSlice.reducer;