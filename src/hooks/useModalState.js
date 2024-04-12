import { useDispatch } from 'react-redux';

import { closeModal as closeModalAction, openModal } from '@/features/modalSlice';
import { MODAL_CONTENT } from '@/constants';

export const useModalState = () => {
  const dispatch = useDispatch();

  function closeModal() {
    dispatch(closeModalAction());
  }

  function showViewDialog() {
    dispatch(openModal(MODAL_CONTENT.TASK_VIEW));
  }

  function showEditDialog() {
    dispatch(openModal(MODAL_CONTENT.TASK_FORM_EDIT));
  }

  function showDeleteDialog() {
    dispatch(openModal(MODAL_CONTENT.TASK_DELETE));
  }

  return {
    closeModal,
    showViewDialog,
    showEditDialog,
    showDeleteDialog
  };
};
