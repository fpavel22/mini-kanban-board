import { useState } from 'react';
import { useSelector } from "react-redux";

import { showModalSelector } from '../../features/showModalSlice';
import {
  BoardContent,
  CardModal,
  Navbar,
  Sidebar,
  TaskForm,
  TaskView,
  TaskDelete
} from '../../components';
import { BoardForm } from '../../components/board-form/board-form';

export const LandingPage = () => {
  const [ sidebarVisible, setSidebarVisible ] = useState(true);
  const {
    boardForm,
    taskForm: { addNewTask, editTask },
    taskView,
    taskDelete
  } = useSelector(showModalSelector);

  const showCardModal = () => (
    (boardForm || taskView || taskDelete || (addNewTask || editTask)) &&
      <CardModal>{ renderCardModalContent() }</CardModal>
  );

  const renderCardModalContent = () => (
    boardForm
      ? <BoardForm />
      : taskView
        ? <TaskView />
        : taskDelete
          ? <TaskDelete />
          : (addNewTask || editTask)
            ? <TaskForm editTask={ editTask } />
            : null
  );

  const sidebarProps = {
    sidebarVisible,
    setSidebarVisible
  };

  return (
    <>
      <Navbar { ...sidebarProps } />
      <div className="app__content-wrapper">
        <Sidebar { ...sidebarProps } />
        <BoardContent { ...sidebarProps } />
        { showCardModal() }
      </div>
    </>
  );
};
