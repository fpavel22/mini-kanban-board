import { createSlice, createAsyncThunk, nanoid } from "@reduxjs/toolkit";

import { REDUCERS, THUNK_STATUS, FIREBASE_QUERY } from '../../constants';

const initialState = {
  boards: [],
  activeBoard: null,
  status: THUNK_STATUS.IDLE,
  error: null
};

export const fetchUserBoards = createAsyncThunk(`${ REDUCERS.BOARDS }/fetchUserBoards`, async (thunkArgs) => {
  const { getCollectionDocs, uid } = thunkArgs;

  const response = await getCollectionDocs(FIREBASE_QUERY.CREATED_BY, uid);
  return response;
});

export const addBoard = createAsyncThunk(`${ REDUCERS.BOARDS }/addBoard`, async (thunkArgs) => {
  const id = nanoid();
  const { setDocument, boardData } = thunkArgs;

  const data = {
    ...boardData,
    id,
    path: id
  };

  const response = await setDocument(id, data);
  return response;
});

const boardsSlice = createSlice({
  name: REDUCERS.BOARDS,
  initialState,
  reducers: {
    resetBoards: () => initialState
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchUserBoards.pending, (state) => {
        state.status = THUNK_STATUS.LOADING
      })
      .addCase(fetchUserBoards.fulfilled, (state, action) => {
        const [ board ] = action.payload;

        state.status = THUNK_STATUS.SUCCEEDED;
        state.activeBoard = board;
        state.boards = action.payload;
      })
      .addCase(fetchUserBoards.rejected, (state, action) => {
        state.status = THUNK_STATUS.FAILED;

        state.error = action.error.message;
      })
      .addCase(addBoard.fulfilled, (state, action) => {
        state.boards.push(action.payload);

        if (!state.activeBoard) {
          state.activeBoard = action.payload;
        }
      });
  }
});

export const { resetBoards } = boardsSlice.actions;

export const boardsSliceSelectors = {
  boardsSelector: (state) => state[ REDUCERS.BOARDS ].boards,
  statusSelector: (state) => state[ REDUCERS.BOARDS ].status,
  errorSelector: (state) => state[ REDUCERS.BOARDS ].error,
  activeBoardSelector: (state) => state[ REDUCERS.BOARDS ].activeBoard
};

export const boardsReducer = boardsSlice.reducer;
