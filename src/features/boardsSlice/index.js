import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import {
  collection,
  query as firestoreQuery,
  where
} from 'firebase/firestore';

import { firestore } from '@/firebase/config';
import { addDoc, getAllDocs } from '@/firebase/operations';
import {
  FIREBASE_QUERY,
  FIREBASE_COLLECTIONS,
  REDUCERS,
  THUNK_STATUS
} from '@/constants';

const initialState = {
  boards: [],
  activeBoard: null,
  status: THUNK_STATUS.IDLE,
  error: null
};

const boardsCollectionRef = collection(firestore, FIREBASE_COLLECTIONS.BOARDS);

export const fetchUserBoards = createAsyncThunk(`${ REDUCERS.BOARDS }/fetchUserBoards`, async (id) => {
  if (!id) {
    return [];
  }

  const boardQuery = firestoreQuery(
    boardsCollectionRef,
    where(FIREBASE_QUERY.CREATED_BY, '==', id)
  );
  const boards = await getAllDocs(boardQuery);

  return boards;
});

export const addBoard = createAsyncThunk(`${ REDUCERS.BOARDS }/addBoard`, async (boardData) => {
  const newBoard = await addDoc(boardsCollectionRef, boardData);

  return newBoard;
});

const boardsSlice = createSlice({
  name: REDUCERS.BOARDS,
  initialState,
  reducers: {
    resetUserBoards: () => initialState
  },
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
  }
});

export const { resetUserBoards } = boardsSlice.actions;

export const allBoardsSelector = (state) => state[ REDUCERS.BOARDS ].boards;
export const boardsStatusSelector = (state) => state[ REDUCERS.BOARDS ].status;
export const boardsErrorSelector = (state) => state[ REDUCERS.BOARDS ].error;
export const activeBoardSelector = (state) => state[ REDUCERS.BOARDS ].activeBoard;

export const boardsReducer = boardsSlice.reducer;
