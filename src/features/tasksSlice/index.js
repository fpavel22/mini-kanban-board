import { createAsyncThunk, createSlice, nanoid } from '@reduxjs/toolkit';
import { FIREBASE_QUERY, REDUCERS, THUNK_STATUS } from '../../constants';

const initialState = {
  tasks: [],
  status: THUNK_STATUS.IDLE,
  error: null,
  selectedTask: null
};

export const fetchTasks = createAsyncThunk(`${ REDUCERS.TASKS }/fetchTasks`, async (thunkArgs) => {
  const { boardId, getCollectionDocs } = thunkArgs;

  const response = await getCollectionDocs(FIREBASE_QUERY.PAGE_ID, boardId);
  return response;
});

export const setTask = createAsyncThunk(`${ REDUCERS.TASKS }/setTask`, async (thunkArgs) => {
  const { taskDetails, setDocument } = thunkArgs;
  const id = taskDetails.id ?? nanoid();

  const task = {
    ...taskDetails,
    id
  };

  const response = await setDocument(id, task);
  return response;
});

export const deleteTask = createAsyncThunk(`${ REDUCERS.TASKS }/deleteTask`, async (thunkArgs) => {
  const { deleteDocument, id } = thunkArgs;

  const response = await deleteDocument(id);
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
        state.error = action.error.message;
      })
      .addCase(setTask.fulfilled, (state, action) => {
        const { id: payloadId } = action.payload;

        const taskIndex = state.tasks.findIndex(({ id }) => id === payloadId);

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

export const { selectTask } = tasksSlice.actions;

export const tasksSliceSelectors = {
  tasksSelector: (state) => state[ REDUCERS.TASKS ].tasks,
  statusSelector: (state) => state[ REDUCERS.TASKS ].status,
  errorSelector: (state) => state[ REDUCERS.TASKS ].error,
  selectedTaskSelector: (state) => state[ REDUCERS.TASKS ].selectedTask
};

export const tasksReducer = tasksSlice.reducer;