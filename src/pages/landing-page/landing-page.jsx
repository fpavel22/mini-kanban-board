import { useState, useEffect } from 'react';
import { useSelector } from "react-redux";

import { modalSelector, isModalVisible } from '../../features/modalSlice';
import {
  BoardContent,
  BoardForm,
  CardModal,
  Navbar,
  Sidebar,
  TaskForm,
  TaskView,
  TaskDelete
} from '../../components';
import { applyPageOverflow } from '../../utils/utils';

export const LandingPage = () => {
  const [ sidebarVisible, setSidebarVisible ] = useState(true);
  const {
    boardForm,
    taskForm: { addNewTask, editTask },
    taskView,
    taskDelete
  } = useSelector(modalSelector);

  const _isModalVisible = useSelector(isModalVisible);

  const renderCardModalContent = (
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

  useEffect(() => {
    applyPageOverflow(_isModalVisible);
  }, [ _isModalVisible ]);

  return (
    <>
      <Navbar { ...sidebarProps } />
      <div className="app__content-wrapper">
        <Sidebar { ...sidebarProps } />
        <BoardContent { ...sidebarProps } />
        { _isModalVisible && <CardModal>{ renderCardModalContent }</CardModal> }
      </div>
    </>
  );
};
