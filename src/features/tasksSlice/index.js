import { createAsyncThunk, createSlice, miniSerializeError } from '@reduxjs/toolkit';

import { getDoc, putDoc, deleteDoc } from '@/firebase/crud';
import { createTasksQuery, taskDocRef } from '@/utils/firebase';
import {
  REDUCERS,
  THUNK_STATUS,
  FIREBASE_COLLECTIONS
} from '@/constants';

const initialState = {
  tasks: [],
  status: THUNK_STATUS.IDLE,
  error: null,
  selectedTask: null
};

export const fetchTasks = createAsyncThunk(`${ REDUCERS.TASKS }/fetchTasks`, async (ids) => {
  const { boardId, userId } = ids;

  if (!boardId || !userId) {
    return [];
  }

  const query = createTasksQuery({ id: boardId, userId });
  const response = await getDoc(query);

  return response;
});

export const setTask = createAsyncThunk(`${ REDUCERS.TASKS }/setTask`, async (
  task,
  {
    getState,
    requestId,
    rejectWithValue
  }
) => {
  const taskId = task.id ?? requestId;

  try {
    const taskData = {
      ...task,
      id: taskId
    };
    const docRef = taskDocRef(taskId);

    const response = await putDoc(docRef, taskData);

    return response;
  } catch (err) {
    const { tasks } = getState().tasks;

    const originalTask = tasks.find(({ id }) => id === taskId);
    return rejectWithValue(miniSerializeError(err), { originalTask });
  }
});

export const deleteTask = createAsyncThunk(`${ REDUCERS.TASKS }/deleteTask`, async (id) => {
  const response = await deleteDoc(FIREBASE_COLLECTIONS.TASKS, id);

  return response;
});

const tasksSlice = createSlice({
  name: REDUCERS.TASKS,
  initialState,
  reducers: {
    selectTask: (state, action) => {
      state.selectedTask = action.payload;
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
      .addCase(setTask.pending, (state, action) => {
        const taskId = action.meta.arg.id ?? action.meta.requestId;

        const taskIndex = state.tasks.findIndex(({ id }) => id === taskId);
        const finalTask = { ...action.meta.arg, id: taskId };

        if (taskIndex >= 0) {
          state.tasks[ taskIndex ] = finalTask;
        } else {
          state.tasks.push(finalTask);
        }

        state.selectedTask = finalTask;
      })
      .addCase(setTask.rejected, (state, action) => {
        const taskId = action.meta.arg.id ?? action.meta.requestId;
        const taskIndex = state.tasks.findIndex(({ id }) => id === taskId);

        if (taskIndex >= 0) {
          const { originalTask } = action.meta;

          if (originalTask) {
            state.tasks[ taskIndex ] = originalTask;
            state.selectedTask = originalTask;
          } else {
            state.tasks.splice(taskIndex, 1);
            state.selectedTask = null;
          }
        }
      })
      .addCase(deleteTask.fulfilled, (state, action) => {
        const updatedTasks = state.tasks.filter(({ id }) => id !== action.payload);

        state.tasks = updatedTasks;
        state.selectedTask = null;
      });
  }
});

export const { selectTask } = tasksSlice.actions;

export const allTasksSelector = (state) => state[ REDUCERS.TASKS ].tasks;
export const tasksStatusSelector = (state) => state[ REDUCERS.TASKS ].status;
export const tasksErrorSelector = (state) => state[ REDUCERS.TASKS ].error;
export const selectedTaskSelector = (state) => state[ REDUCERS.TASKS ].selectedTask;

export const tasksReducer = tasksSlice.reducer;
