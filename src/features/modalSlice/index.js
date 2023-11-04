import { createSlice } from '@reduxjs/toolkit';
import { REDUCERS } from '@/constants';

const initialState = {
  modalOpen: false,
  modalContent: null
};

const modalSlice = createSlice({
  name: REDUCERS.SHOW_MODAL,
  initialState,
  reducers: {
    openModal: (state, action) => {
      state.modalOpen = true;
      state.modalContent = action.payload;
    },
    closeModal: () => initialState
  }
});

export const { openModal, closeModal } = modalSlice.actions;

export const modalOpenSelector = (state) => state[ REDUCERS.SHOW_MODAL ].modalOpen;
export const modalContentSelector = (state) => state[ REDUCERS.SHOW_MODAL ].modalContent;

export const modalReducer = modalSlice.reducer;
