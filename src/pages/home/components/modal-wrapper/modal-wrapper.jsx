import { useLayoutEffect } from 'react';
import { useSelector } from 'react-redux';

import { ModalOverlay } from '@/components';
import { modalOpenSelector, modalContentSelector } from '@/features/modalSlice';
import { themeSliceSelector } from '@/features/themeSlice';
import { userSelector } from '@/features/userSlice';
import { useModalState } from '@/hooks';
import { MODAL_CONTENT } from '@/constants';

import { BoardForm } from '../board-form';
import { TaskDelete } from '../task-delete';
import { TaskForm } from '../task-form';
import { TaskView } from '../task-view';

const MODAL_CHILDREN = {
  [ MODAL_CONTENT.BOARD_FORM ]: (props) => <BoardForm { ...props } />,
  [ MODAL_CONTENT.TASK_DELETE ]: (props) => <TaskDelete { ...props } />,
  [ MODAL_CONTENT.TASK_FORM_ADD ]: (props) => <TaskForm { ...props } />,
  [ MODAL_CONTENT.TASK_FORM_EDIT ]: (props) => <TaskForm { ...props } editing={ true } />,
  [ MODAL_CONTENT.TASK_VIEW]: (props) => <TaskView { ...props } />
};

const applyPageOverflow = (isModalVisible) => {
  const { documentElement } = document;

  documentElement.classList.toggle('modal--visible', isModalVisible);
};

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

  const ModalContent = MODAL_CHILDREN[ modalContent ];

  useLayoutEffect(() => {
    applyPageOverflow(modalOpen);
  }, [ modalOpen ]);

  return modalOpen && (
    <ModalOverlay
      darkMode={ darkMode }
      onClickOutside={ closeModal }
    >
      <ModalContent { ...commonProps } />
    </ModalOverlay>
  );
};
