import { createSlice } from "@reduxjs/toolkit";
import { REDUCERS } from "../../constants";

const initialState = {
  user: null
}

const userSlice = createSlice({
  name: REDUCERS.USER,
  initialState,
  reducers: {
    changeUserAuth: (state, action) => {
      state.user = action.payload;
    }
  }
});

export const { changeUserAuth } = userSlice.actions;

export const userSelector = (state) => state[ REDUCERS.USER ].user;

export const userReducer = userSlice.reducer;