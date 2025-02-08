import { useCallback } from 'react';
import { useDispatch } from 'react-redux';

import { closeModal as closeModalAction, openModal } from '@/features/modalSlice';
import { MODAL_CONTENT } from '@/constants';

export const useModalState = () => {
  const dispatch = useDispatch();

  const closeModal = useCallback(() => {
    dispatch(closeModalAction());
  }, [ dispatch ]);

  const showDeleteDialog = useCallback(() => {
    dispatch(openModal(MODAL_CONTENT.TASK_DELETE));
  }, [ dispatch ]);

  const showEditDialog = useCallback(() => {
    dispatch(openModal(MODAL_CONTENT.TASK_FORM_EDIT));
  }, [ dispatch ]);

  const showViewDialog = useCallback(() => {
    dispatch(openModal(MODAL_CONTENT.TASK_VIEW));
  }, [ dispatch ]);

  return {
    closeModal,
    showDeleteDialog,
    showEditDialog,
    showViewDialog
  };
};
