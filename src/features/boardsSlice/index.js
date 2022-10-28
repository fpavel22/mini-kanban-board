import { createSlice, createAsyncThunk, nanoid } from '@reduxjs/toolkit';

import { getCollectionDocs, setDocument } from '../../utils/firebase';
import { REDUCERS, THUNK_STATUS, FIREBASE_COLLECTIONS } from '../../constants';

const initialState = {
  boards: [],
  activeBoard: null,
  status: THUNK_STATUS.IDLE,
  error: null
};

export const fetchUserBoards = createAsyncThunk(`${ REDUCERS.BOARDS }/fetchUserBoards`, async (id) => {
  if (!id) {
    return [];
  }

  const response = await getCollectionDocs(
    FIREBASE_COLLECTIONS.BOARDS,
    id
  );

  return response;
});

export const addBoard = createAsyncThunk(`${ REDUCERS.BOARDS }/addBoard`, async (board) => {
  const id = nanoid();

  const boardData = {
    ...board,
    id,
    path: id
  };

  const response = await setDocument(
    FIREBASE_COLLECTIONS.BOARDS,
    id,
    boardData
  );

  return response;
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
