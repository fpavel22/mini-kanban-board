import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import {
  collection,
  doc,
  query as firestoreQuery,
  where
} from 'firebase/firestore';

import { REDUCERS, THUNK_STATUS } from '@/constants';
import { firestore } from '@/firebase/config';
import { FIREBASE_COLLECTIONS, FIREBASE_QUERY } from '@/firebase/constants';
import {
  addDoc,
  deleteDoc,
  getAllDocs,
  updateDoc
} from '@/firebase/operations';

const initialState = {
  dbTasks: [],
  error: null,
  selectedTask: null,
  status: THUNK_STATUS.IDLE,
  tasks: [],
};

const tasksCollectionRef = collection(firestore, FIREBASE_COLLECTIONS.TASKS);

const createTaskDocumentRef = (id) => doc(firestore, FIREBASE_COLLECTIONS.TASKS, id);

export const fetchBoardTasks = createAsyncThunk(`${ REDUCERS.TASKS }/fetchBoardTasks`, async ({ boardId, userId }) => {
  if (!boardId || !userId) {
    return [];
  }

  const tasksQuery = firestoreQuery(
    tasksCollectionRef,
    where(FIREBASE_QUERY.PAGE_ID, '==', boardId),
    where(FIREBASE_QUERY.CREATED_BY, '==', userId)
  );
  const boardTasks = await getAllDocs(tasksQuery);

  return boardTasks;
});

export const addTask = createAsyncThunk(`${ REDUCERS.TASKS }/addTask`, async (taskData) => {
  const newTask = await addDoc(tasksCollectionRef, taskData);

  return newTask;
});

export const updateTask = createAsyncThunk(`${ REDUCERS.TASKS }/updateTask`, async (
  taskData,
  {
    dispatch,
    getState,
    rejectWithValue,
    requestId
  }
) => {
  // Update task optimistically
  // eslint-disable-next-line
  dispatch(optimisticUpdateTask(taskData));

  try {
    const updatedTask = await updateDoc(createTaskDocumentRef(taskData.id), taskData);

    return updatedTask;
  } catch (error) {
    const { dbTasks } = getState().tasks;
    const taskId = taskData.id ?? requestId;

    // Revert to previous task if db update fails
    const originalTask = dbTasks.find(({ id }) => id === taskId);
    return rejectWithValue(error, { originalTask });
  }
});

export const deleteTask = createAsyncThunk(`${ REDUCERS.TASKS }/deleteTask`, async (id) => {
  const deletedTaskId = await deleteDoc(createTaskDocumentRef(id));

  return deletedTaskId;
});

const tasksSlice = createSlice({
  extraReducers: (builder) => {
    builder
      .addCase(fetchBoardTasks.pending, (state) => {
        state.status = THUNK_STATUS.LOADING;
      })
      .addCase(fetchBoardTasks.fulfilled, (state, action) => {
        state.status = THUNK_STATUS.SUCCEEDED;

        state.dbTasks = action.payload;
        state.tasks = action.payload;
      })
      .addCase(fetchBoardTasks.rejected, (state, action) => {
        state.status = THUNK_STATUS.FAILED;

        state.error = action.error.message;
      })
      .addCase(addTask.fulfilled, (state, action) => {
        state.dbTasks.push(action.payload);
        state.tasks.push(action.payload);
      })
      .addCase(updateTask.rejected, (state, { meta }) => {
        const originalTaskId = meta.arg.id ?? meta.requestId;
        const originalTaskIndex = state.tasks.findIndex(
          ({ id }) => id === originalTaskId
        );

        if (originalTaskIndex < 0) {
          return;
        }

        const { originalTask } = meta;

        if (originalTask) {
          state.tasks[ originalTaskIndex ] = originalTask;
        } else {
          state.tasks.splice(originalTaskIndex, 1);
        }

        if (state.selectedTask?.id === originalTask.id) {
          state.selectedTask = originalTask;
        }
      })
      .addCase(deleteTask.fulfilled, (state, action) => {
        const deletedTaskId = state.dbTasks.findIndex(
          ({ id }) => id === action.payload
        );

        if (deletedTaskId < 0) {
          return;
        }

        state.dbTasks.splice(deletedTaskId, 1);
        state.tasks.splice(deleteTask, 1);
        state.selectedTask = null;
      });
  },
  initialState,
  name: REDUCERS.TASKS,
  reducers: {
    optimisticUpdateTask: (state, action) => {
      const updatedTaskIndex = state.tasks.findIndex(
        ({ id }) => id === action.payload.id
      );

      if (updatedTaskIndex < 0) {
        return;
      }

      state.tasks[ updatedTaskIndex ] = action.payload;

      if (state.selectedTask?.id === action.payload.id) {
        state.selectedTask = action.payload;
      }
    },
    selectTask: (state, action) => {
      state.selectedTask = action.payload;
    }
  }
});

export const { optimisticUpdateTask, selectTask } = tasksSlice.actions;

export const allTasksSelector = (state) => state[ REDUCERS.TASKS ].tasks;
export const selectedTaskSelector = (state) => state[ REDUCERS.TASKS ].selectedTask;
export const tasksErrorSelector = (state) => state[ REDUCERS.TASKS ].error;
export const tasksStatusSelector = (state) => state[ REDUCERS.TASKS ].status;

export const tasksReducer = tasksSlice.reducer;
