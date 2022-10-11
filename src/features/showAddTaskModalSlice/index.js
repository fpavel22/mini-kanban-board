import { createSlice } from '@reduxjs/toolkit';
import { REDUCERS } from '../../constants';

const initialState = {
  showModal: false
};

const showAddTaskModalSlice = createSlice({
  name: REDUCERS.SHOW_ADD_TASK,
  initialState,
  reducers: {
    displayModal: (state) => {
      state.showModal = true;
    },
    hideModal: (state) => {
      state.showModal = false;
    }
  }
});

export const { displayModal, hideModal } = showAddTaskModalSlice.actions;

export const showAddTaskSelector = (state) => state[ REDUCERS.SHOW_ADD_TASK ].showModal;

export const showAddTaskReducer = showAddTaskModalSlice.reducer;