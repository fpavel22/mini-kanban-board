import { createSlice } from '@reduxjs/toolkit';

import { REDUCERS } from '@/constants';

const initialState = {
  modalContent: null,
  modalOpen: false
};

const modalSlice = createSlice({
  initialState,
  name: REDUCERS.SHOW_MODAL,
  reducers: {
    closeModal: () => initialState,
    openModal: (state, action) => {
      state.modalOpen = true;
      state.modalContent = action.payload;
    }
  }
});

export const { closeModal, openModal } = modalSlice.actions;

export const modalContentSelector = (state) => state[ REDUCERS.SHOW_MODAL ].modalContent;
export const modalOpenSelector = (state) => state[ REDUCERS.SHOW_MODAL ].modalOpen;

export const modalReducer = modalSlice.reducer;
