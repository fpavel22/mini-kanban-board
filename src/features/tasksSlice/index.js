import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import {
  collection,
  doc,
  query as firestoreQuery,
  where
} from 'firebase/firestore';

import { firestore } from '@/firebase/config';
import {
  getAllDocs,
  addDoc,
  updateDoc,
  deleteDoc
} from '@/firebase/operations';
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

export const updateTask = createAsyncThunk(`${ REDUCERS.TASKS }/updateTask`, async (task) => {
  const updatedTask = await updateDoc(createTaskDocumentRef(task.id), task);

  return updatedTask;
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
  }
});

export const { selectTask } = tasksSlice.actions;

export const allTasksSelector = (state) => state[ REDUCERS.TASKS ].tasks;
export const tasksStatusSelector = (state) => state[ REDUCERS.TASKS ].status;
export const tasksErrorSelector = (state) => state[ REDUCERS.TASKS ].error;
export const selectedTaskSelector = (state) => state[ REDUCERS.TASKS ].selectedTask;

export const tasksReducer = tasksSlice.reducer;
