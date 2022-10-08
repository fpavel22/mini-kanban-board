import { createSlice } from "@reduxjs/toolkit";
import { REDUCERS } from "../../constants";

const initialState = {
  darkMode: false
};

const themeSlice = createSlice({
  name: REDUCERS.THEME,
  initialState,
  reducers: {
    enableLightTheme: (state) => {
      state.darkMode = false;
    },
    enableDarkTheme: (state) => {
      state.darkMode = true;
    }
  }
});

export const { enableDarkTheme, enableLightTheme } = themeSlice.actions;

export const themeSliceSelector = (state) => state[ REDUCERS.THEME ].darkMode;

export const themeReducer = themeSlice.reducer;