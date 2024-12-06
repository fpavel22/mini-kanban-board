import { createAsyncThunk, createSlice, miniSerializeError } from '@reduxjs/toolkit';
import {
  collection,
  doc,
  query as firestoreQuery,
  where
} from 'firebase/firestore';

import { firestore } from '@/firebase/config';
import { getAllDocs, updateDoc, deleteDoc } from '@/firebase/operations';
import {
  FIREBASE_COLLECTIONS,
  FIREBASE_QUERY,
  REDUCERS,
  THUNK_STATUS,
} from '@/constants';

const initialState = {
  tasks: [],
  status: THUNK_STATUS.IDLE,
  error: null,
  selectedTask: null
};

const createGetTasksQuery = (boardId, userId) => firestoreQuery(
  collection(firestore, FIREBASE_COLLECTIONS.TASKS),
  where(FIREBASE_QUERY.PAGE_ID, '==', boardId),
  where(FIREBASE_QUERY.CREATED_BY, '==', userId)
);

const createTaskDocumentRef = (id) => doc(firestore, FIREBASE_COLLECTIONS.TASKS, id);

export const fetchBoardTasks = createAsyncThunk(`${ REDUCERS.TASKS }/fetchBoardTasks`, async ({ boardId, userId }) => {
  if (!boardId || !userId) {
    return [];
  }

  const tasksQuery = createGetTasksQuery(boardId, userId);
  const boardTasks = await getAllDocs(tasksQuery);

  return boardTasks;
});

// export const addTask = createAsyncThunk(`${ REDUCERS.TASKS }/updateTask`, (task) => {});

export const updateTask = createAsyncThunk(`${ REDUCERS.TASKS }/updateTask`, async (
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

    const response = await updateDoc(createTaskDocumentRef(taskId), taskData);

    return response;
  } catch (err) {
    const { tasks } = getState().tasks;

    const originalTask = tasks.find(({ id }) => id === taskId);
    return rejectWithValue(miniSerializeError(err), { originalTask });
  }
});

export const deleteTask = createAsyncThunk(`${ REDUCERS.TASKS }/deleteTask`, async (id) => {
  const deletedTaskId = await deleteDoc(createTaskDocumentRef(id));

  return deletedTaskId;
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
      .addCase(fetchBoardTasks.pending, (state) => {
        state.status = THUNK_STATUS.LOADING;
      })
      .addCase(fetchBoardTasks.fulfilled, (state, action) => {
        state.status = THUNK_STATUS.SUCCEEDED;

        state.tasks = action.payload;
      })
      .addCase(fetchBoardTasks.rejected, (state, action) => {
        state.status = THUNK_STATUS.FAILED;

        state.error = action.error.message;
      })
      .addCase(updateTask.pending, (state, action) => {
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
      .addCase(updateTask.rejected, (state, action) => {
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
