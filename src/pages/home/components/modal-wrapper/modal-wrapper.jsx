import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { unwrapResult } from '@reduxjs/toolkit';

import { ModalOverlay } from '@/components';
import { addBoard } from '@/features/boardsSlice';
import {
  modalOpenSelector,
  modalContentSelector,
  closeModal,
  openModal
} from '@/features/modalSlice';
import { selectedTaskSelector, deleteTask, setTask } from '@/features/tasksSlice';
import { themeSliceSelector } from '@/features/themeSlice';
import { userSelector } from '@/features/userSlice';
import { applyPageOverflow } from '@/utils/utils';
import { MODAL_CONTENT } from '@/constants';

import { BoardForm } from '../board-form';
import { TaskDelete } from '../task-delete';
import { TaskForm } from '../task-form';
import { TaskView } from '../task-view';

// const MODAL_CHILDREN = {
//   [ MODAL_CONTENT.BOARD_FORM ]: (props) => <BoardForm { ...props } />,
//   [ MODAL_CONTENT.TASK_DELETE ]: (props) => <TaskDelete { ...props } />,
//   [ MODAL_CONTENT.TASK_FORM_ADD ]: (props) => <TaskForm { ...props } />,
//   [ MODAL_CONTENT.TASK_FORM_EDIT ]: (props) => <TaskForm { ...props } isEditing={ true } />,
//   [ MODAL_CONTENT.TASK_VIEW ]: (props) => <TaskView { ...props } />,
// };

export const ModalWrapper = () => {
  const user = useSelector(userSelector);
  const darkMode = useSelector(themeSliceSelector);

  const modalOpen = useSelector(modalOpenSelector);
  const modalContent = useSelector(modalContentSelector);

  const selectedTask = useSelector(selectedTaskSelector);

  const dispatch = useDispatch();

  const taskTitle = selectedTask?.title.length > 24
    ? `${selectedTask?.title.substring(0, 24)}...`
    : selectedTask?.title;

  function handleCloseModal() {
    dispatch(closeModal());
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

  async function createBoard(boardData) {
    const newBoard = {
      ...boardData,
      createdBy: user.uid
    };

    const thunkResponse = await dispatch(addBoard(newBoard));
    await unwrapResult(thunkResponse);
  }

  async function createNewTask(taskDetails) {
    const thunkResponse = await dispatch(setTask(taskDetails));

    await unwrapResult(thunkResponse);
  }

  async function deleteSelectedTask() {
    const thunkResponse = await dispatch(deleteTask(selectedTask?.id));

    await unwrapResult(thunkResponse);
  }

  async function updateSubtaskStatus(event, id) {
    const { checked } = event.target;

    const updatedSubtasks = selectedTask?.subtasks.map((subtask) => (
      subtask.id === id ? { ...subtask, completed: checked } : subtask
    ));

    const taskData = {
      ...selectedTask,
      subtasks: updatedSubtasks
    };

    const thunkResponse = await dispatch(setTask(taskData));
    await unwrapResult(thunkResponse);
  }

  const commonProps = {
    closeModal: handleCloseModal
  };

  const MODAL_CHILDREN = {
    [ MODAL_CONTENT.BOARD_FORM ]: (
      <BoardForm { ...commonProps } addBoard={ createBoard } />
    ),
    [ MODAL_CONTENT.TASK_DELETE ]: (
      <TaskDelete
        { ...commonProps }
        taskTitle={ taskTitle }
        onDeleteTask={ deleteSelectedTask }
      />
    ),
    [ MODAL_CONTENT.TASK_FORM_ADD ]: (
      <TaskForm
        { ...commonProps }
        user={ user }
        showViewDialog={ showViewDialog }
        createNewTask={ createNewTask }
      />
    ),
    [ MODAL_CONTENT.TASK_FORM_EDIT ]: (
      <TaskForm
        { ...commonProps }
        user={ user }
        editing={ true }
        showViewDialog={ showViewDialog }
        selectedTask={ selectedTask }
        createNewTask={ createNewTask }
      />
    ),
    [ MODAL_CONTENT.TASK_VIEW]: (
      <TaskView
        { ...commonProps }
        darkMode={ darkMode }
        selectedTask={ selectedTask }
        showEditDialog={ showEditDialog }
        showDeleteDialog={ showDeleteDialog }
        updateSubtaskStatus={ updateSubtaskStatus }
      />
    ),
  };

  const children = MODAL_CHILDREN[ modalContent ];

  useEffect(() => {
    applyPageOverflow(modalOpen);
  }, [ modalOpen ]);

  return modalOpen && (
    <ModalOverlay
      darkMode={ darkMode }
      closeModal={ handleCloseModal }
    >
      { children }
    </ModalOverlay>
  );
};
