import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import {
  BoardForm,
  CardModal,
  TaskForm,
  TaskView,
  TaskDelete
} from '@/components';
import { modalOpenSelector, modalContentSelector, closeModal } from '@/features/modalSlice';
import { themeSliceSelector } from '@/features/themeSlice';
import { applyPageOverflow } from '@/utils/utils';
import { MODAL_CONTENT } from '@/constants';

export const ModalWrapper = () => {
  const darkMode = useSelector(themeSliceSelector);
  const modalOpen = useSelector(modalOpenSelector);
  const modalContent = useSelector(modalContentSelector);

  const dispatch = useDispatch();

  function handleCloseModal() {
    dispatch(closeModal());
  }

  const renderCardModalContent = () => {
    switch (modalContent) {
      case MODAL_CONTENT.BOARD_FORM:
        return <BoardForm />;
      case MODAL_CONTENT.TASK_DELETE:
        return <TaskDelete />;
      case MODAL_CONTENT.TASK_FORM_ADD:
        return <TaskForm />;
      case MODAL_CONTENT.TASK_FORM_EDIT:
        return <TaskForm editing />;
      case MODAL_CONTENT.TASK_VIEW:
        return <TaskView />;
      default:
        return null;
    }
  };

  useEffect(() => {
    applyPageOverflow(modalOpen);
  }, [ modalOpen ]);

  return modalOpen && (
    <CardModal
      darkMode={ darkMode }
      closeModal={ handleCloseModal }
    >
      { renderCardModalContent() }
    </CardModal>
  );
};
