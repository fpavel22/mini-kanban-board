import { createSlice } from "@reduxjs/toolkit";
import { REDUCERS } from '../../constants';

const initialState = {
  pages: []
};

const pagesSlice = createSlice({
  name: REDUCERS.PAGES,
  initialState,
  reducers: {
    getUserBoards: (state, action) => {
      state.pages = action.payload;
    },
    addBoard: (state, action) => {
      state.pages.push(action.payload);
    }
  }
});

export const { getUserBoards, addBoard }  = pagesSlice.actions;

export const pagesSelector = (state) => state[ REDUCERS.PAGES ].pages;

export const pagesReducer = pagesSlice.reducer;