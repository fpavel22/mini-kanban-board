import { createSlice } from "@reduxjs/toolkit";
import { REDUCERS } from "../../constants";

const initialState = {
  user: null
}

const userSlice = createSlice({
  name: REDUCERS.USER,
  initialState,
  reducers: {
    login: (state, action) => {
      state.user = action.payload;
    },
    logout: (state) => {
      state.user = null;
    }
  }
});

export const { login, logout } = userSlice.actions;

export const userSelector = (state) => state[ REDUCERS.USER ].user;

export const userReducer = userSlice.reducer;