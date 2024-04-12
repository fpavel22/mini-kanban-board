import { useEffect } from 'react';
import { useSelector } from 'react-redux';

import { ModalOverlay } from '@/components';
import { modalOpenSelector, modalContentSelector } from '@/features/modalSlice';
import { themeSliceSelector } from '@/features/themeSlice';
import { userSelector } from '@/features/userSlice';
import { applyPageOverflow } from '@/utils/utils';
import { useModalState } from '@/hooks';
import { MODAL_CONTENT } from '@/constants';

import { BoardForm } from '../board-form';
import { TaskDelete } from '../task-delete';
import { TaskForm } from '../task-form';
import { TaskView } from '../task-view';

export const ModalWrapper = () => {
  const user = useSelector(userSelector);
  const darkMode = useSelector(themeSliceSelector);

  const modalOpen = useSelector(modalOpenSelector);
  const modalContent = useSelector(modalContentSelector);

  const { closeModal } = useModalState();

  const commonProps = {
    darkMode,
    user,
    closeModal
  };

  const MODAL_CHILDREN = {
    [ MODAL_CONTENT.BOARD_FORM ]: <BoardForm { ...commonProps } />,
    [ MODAL_CONTENT.TASK_DELETE ]: <TaskDelete { ...commonProps } />,
    [ MODAL_CONTENT.TASK_FORM_ADD ]: <TaskForm { ...commonProps } />,
    [ MODAL_CONTENT.TASK_FORM_EDIT ]: <TaskForm { ...commonProps } editing={ true } />,
    [ MODAL_CONTENT.TASK_VIEW]: <TaskView { ...commonProps } />
  };

  const children = MODAL_CHILDREN[ modalContent ];

  useEffect(() => {
    applyPageOverflow(modalOpen);
  }, [ modalOpen ]);

  return modalOpen && (
    <ModalOverlay
      darkMode={ darkMode }
      closeModal={ closeModal }
    >
      { children }
    </ModalOverlay>
  );
};
