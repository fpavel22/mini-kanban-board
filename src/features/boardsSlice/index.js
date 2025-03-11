import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import {
  collection,
  query as firestoreQuery,
  where
} from 'firebase/firestore';

import { REDUCERS, THUNK_STATUS } from '@/constants';
import { firestore } from '@/firebase/config';
import { FIREBASE_COLLECTIONS, FIREBASE_QUERY } from '@/firebase/constants';
import { addDoc, getAllDocs } from '@/firebase/operations';

const initialState = {
  activeBoard: null,
  boards: [],
  error: null,
  status: THUNK_STATUS.IDLE
};

const boardsCollectionRef = collection(firestore, FIREBASE_COLLECTIONS.BOARDS);

export const fetchUserBoards = createAsyncThunk(`${ REDUCERS.BOARDS }/fetchUserBoards`, async (userId) => {
  if (!userId) {
    return [];
  }

  const boardQuery = firestoreQuery(
    boardsCollectionRef,
    where(FIREBASE_QUERY.CREATED_BY, '==', userId)
  );
  const boards = await getAllDocs(boardQuery);

  return boards;
});

export const addBoard = createAsyncThunk(`${ REDUCERS.BOARDS }/addBoard`, async (boardData) => {
  const newBoard = await addDoc(boardsCollectionRef, boardData);

  return newBoard;
});

const boardsSlice = createSlice({
  extraReducers: (builder) => {
    builder
      .addCase(fetchUserBoards.pending, (state) => {
        state.status = THUNK_STATUS.LOADING;
      })
      .addCase(fetchUserBoards.fulfilled, (state, action) => {
        state.status = THUNK_STATUS.SUCCEEDED;

        const [ board ] = action.payload;

        state.activeBoard = board;
        state.boards = action.payload;
      })
      .addCase(fetchUserBoards.rejected, (state, action) => {
        state.status = THUNK_STATUS.FAILED;

        state.error = action.error.message;
      })
      .addCase(addBoard.fulfilled, (state, action) => {
        if (!state.activeBoard) {
          state.activeBoard = action.payload;
        }

        state.boards.push(action.payload);
      });
  },
  initialState,
  name: REDUCERS.BOARDS,
  reducers: {
    resetUserBoards: () => initialState
  }
});

export const { resetUserBoards } = boardsSlice.actions;

export const activeBoardSelector = (state) => state[ REDUCERS.BOARDS ].activeBoard;
export const allBoardsSelector = (state) => state[ REDUCERS.BOARDS ].boards;
export const boardsErrorSelector = (state) => state[ REDUCERS.BOARDS ].error;
export const boardsStatusSelector = (state) => state[ REDUCERS.BOARDS ].status;

export const boardsReducer = boardsSlice.reducer;
