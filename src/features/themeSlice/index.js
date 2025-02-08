import { createSlice } from '@reduxjs/toolkit';

import { REDUCERS } from '@/constants';

const initialState = {
  darkMode: false
};

const themeSlice = createSlice({
  initialState,
  name: REDUCERS.THEME,
  reducers: {
    enableDarkTheme: (state) => {
      state.darkMode = true;
    },
    enableLightTheme: (state) => {
      state.darkMode = false;
    }
  }
});

export const { enableDarkTheme, enableLightTheme } = themeSlice.actions;

export const themeSliceSelector = (state) => state[ REDUCERS.THEME ].darkMode;

export const themeReducer = themeSlice.reducer;
