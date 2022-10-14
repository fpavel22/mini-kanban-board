import { createSlice } from '@reduxjs/toolkit';
import { REDUCERS } from '../../constants';

const initialState = {
  showAddTaskModal: false,
  showTaskDetailsModal: false,
  showDeleteTaskModal: false,
  editing: false
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
    enableEditing: (state) => {
      state.editing = true;
    },
    disableEditing: (state) => {
      state.editing = false;
    },
    showTaskDetailsModal: (state) => {
      state.showTaskDetailsModal = true;
    },
    hideTaskDetailsModal: (state) => {
      state.showTaskDetailsModal = false;
    },
    showDeleteTaskModal: (state) => {
      state.showTaskDetailsModal = false;
      state.showDeleteTaskModal = true;
    },
    hideDeleteTaskModal: (state) => {
      state.showDeleteTaskModal = false;
    }
  }
});

export const {
  showAddTaskModal,
  hideAddTaskModal,
  enableEditing,
  disableEditing,
  showTaskDetailsModal,
  hideTaskDetailsModal,
  showDeleteTaskModal,
  hideDeleteTaskModal
} = showModalSlice.actions;

export const showModalSelector = (state) => state[ REDUCERS.SHOW_MODAL ];

export const showModalReducer = showModalSlice.reducer;