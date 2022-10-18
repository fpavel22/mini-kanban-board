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

export const LandingPage = () => {
  const [ sidebarVisible, setSidebarVisible ] = useState(true);
  const {
    taskForm: { addNewTask, editTask },
    taskView,
    taskDelete
  } = useSelector(showModalSelector);

  const showCardModal = () => (
    (taskView || taskDelete || (addNewTask || editTask)) &&
      <CardModal>{ renderCardModalContent() }</CardModal>
  );

  const renderCardModalContent = () => (
    taskView
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
        <BoardContent />
        { showCardModal() }
      </div>
    </>
  );
};
