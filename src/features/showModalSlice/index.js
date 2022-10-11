import { createSlice } from '@reduxjs/toolkit';
import { REDUCERS } from '../../constants';

const initialState = {
  showAddTaskModal: false,
  showTaskDetailsModal: false
};

const showModalSlice = createSlice({
  name: REDUCERS.SHOW_MODAL,
  initialState,
  reducers: {
    showAddTaskModal: (state) => {
      state.showAddTaskModal = true;
    },
    hideAddTaskModal: (state) => {
      state.showAddTaskModal = false;
    },
    showTaskDetailsModal: (state) => {
      state.showTaskDetailsModal = true;
    },
    hideTaskDetailsModal: (state) => {
      state.showTaskDetailsModal = false;
    }
  }
});

export const {
  showAddTaskModal,
  hideAddTaskModal,
  showTaskDetailsModal,
  hideTaskDetailsModal
} = showModalSlice.actions;

export const showModalSelector = (state) => state[ REDUCERS.SHOW_MODAL ];

export const showModalReducer = showModalSlice.reducer;