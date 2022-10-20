import { createSlice } from "@reduxjs/toolkit";
import { REDUCERS } from '../../constants';

const initialState = {
  boards: []
};

const boardsSlice = createSlice({
  name: REDUCERS.BOARDS,
  initialState,
  reducers: {
    setUserBoards: (state, action) => {
      state.boards = action.payload;
    },
    addBoard: (state, action) => {
      state.boards.push(action.payload);
    }
  }
});

export const { setUserBoards, addBoard }  = boardsSlice.actions;

export const boardsSelector = (state) => state[ REDUCERS.BOARDS ].boards;

export const boardsReducer = boardsSlice.reducer;