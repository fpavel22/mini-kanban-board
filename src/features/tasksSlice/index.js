import { createAsyncThunk, createSlice, nanoid } from '@reduxjs/toolkit';

import { getCollectionDocs, setDocument, deleteDocument } from '../../utils/firebase';
import { REDUCERS, THUNK_STATUS, FIREBASE_COLLECTIONS, FIREBASE_QUERY } from '../../constants';

const initialState = {
  tasks: [],
  status: THUNK_STATUS.IDLE,
  error: null,
  selectedTask: null
};

export const fetchTasks = createAsyncThunk(`${ REDUCERS.TASKS }/fetchTasks`, async (id) => {
  const response = await getCollectionDocs(
    FIREBASE_COLLECTIONS.TASKS,
    FIREBASE_QUERY.PAGE_ID,
    id
  );

  return response;
});

export const setTask = createAsyncThunk(`${ REDUCERS.TASKS }/setTask`, async (task) => {
  const taskId = task.id ?? nanoid();

  const taskData = {
    ...task,
    id: taskId
  };

  const response = await setDocument(
    FIREBASE_COLLECTIONS.TASKS,
    taskId,
    taskData
  );

  return response;
});

export const deleteTask = createAsyncThunk(`${ REDUCERS.TASKS }/deleteTask`, async (id) => {
  const response = await deleteDocument(FIREBASE_COLLECTIONS.TASKS, id);

  return response;
});

const tasksSlice = createSlice({
  name: REDUCERS.TASKS,
  initialState,
  reducers: {
    selectTask: (state, action) => {
      state.selectedTask = action.payload;
    },
    resetTasks: (state) => {
      state.tasks = [];
      state.selectedTask = null;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchTasks.pending, (state) => {
        state.status = THUNK_STATUS.LOADING;
      })
      .addCase(fetchTasks.fulfilled, (state, action) => {
        state.status = THUNK_STATUS.SUCCEEDED;

        state.tasks = action.payload;
      })
      .addCase(fetchTasks.rejected, (state, action) => {
        state.status = THUNK_STATUS.FAILED;

        state.error = action.error.message;
      })
      .addCase(setTask.fulfilled, (state, action) => {
        const taskIndex = state.tasks.findIndex(({ id }) => id === action.payload.id);

        if (taskIndex >= 0) {
          state.tasks[ taskIndex ] = action.payload;
        } else {
          state.tasks.push(action.payload);
        }

        state.selectedTask = action.payload;
      })
      .addCase(deleteTask.fulfilled, (state, action) => {
        const updatedTasks = state.tasks.filter(({ id }) => id !== action.payload);

        state.tasks = updatedTasks;
        state.selectedTask = null;
      });
  }
});

export const { selectTask, resetTasks } = tasksSlice.actions;

export const allTasksSelector = (state) => state[ REDUCERS.TASKS ].tasks;
export const tasksStatusSelector = (state) => state[ REDUCERS.TASKS ].status;
export const tasksErrorSelector = (state) => state[ REDUCERS.TASKS ].error;
export const selectedTaskSelector = (state) => state[ REDUCERS.TASKS ].selectedTask;

export const tasksReducer = tasksSlice.reducer;