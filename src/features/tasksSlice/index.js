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
  error: null,
  selectedTask: null,
  status: THUNK_STATUS.IDLE,
  tasks: []
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

export const updateTask = createAsyncThunk(`${ REDUCERS.TASKS }/updateTask`, async (taskData) => {
  const updatedTask = await updateDoc(createTaskDocumentRef(taskData.id), taskData);

  return updatedTask;
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

        state.tasks = action.payload;
      })
      .addCase(fetchBoardTasks.rejected, (state, action) => {
        state.status = THUNK_STATUS.FAILED;

        state.error = action.error.message;
      })
      .addCase(addTask.fulfilled, (state, action) => {
        state.tasks.push(action.payload);
      })
      .addCase(updateTask.fulfilled, (state, action) => {
        state.tasks = state.tasks.map((task) => (
          task.id === action.payload.id ? action.payload : task
        ));

        if (state.selectedTask.id === action.payload.id) {
          state.selectedTask = action.payload;
        }
      })
      .addCase(deleteTask.fulfilled, (state, action) => {
        state.tasks = state.tasks.filter(({ id }) => id !== action.payload);
        state.selectedTask = null;
      });
  },
  initialState,
  name: REDUCERS.TASKS,
  reducers: {
    selectTask: (state, action) => {
      state.selectedTask = action.payload;
    }
  }
});

export const { selectTask } = tasksSlice.actions;

export const allTasksSelector = (state) => state[ REDUCERS.TASKS ].tasks;
export const selectedTaskSelector = (state) => state[ REDUCERS.TASKS ].selectedTask;
export const tasksErrorSelector = (state) => state[ REDUCERS.TASKS ].error;
export const tasksStatusSelector = (state) => state[ REDUCERS.TASKS ].status;

export const tasksReducer = tasksSlice.reducer;
