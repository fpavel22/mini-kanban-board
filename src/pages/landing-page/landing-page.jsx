import { useState, useEffect } from 'react';
import { useSelector } from "react-redux";

import { modalOpenSelector, modalContentSelector } from '../../features/modalSlice';
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
import { MODAL_CONTENT } from '../../constants';

export const LandingPage = () => {
  const [ sidebarVisible, setSidebarVisible ] = useState(true);

  const modalOpen = useSelector(modalOpenSelector);
  const modalContent = useSelector(modalContentSelector);

  const renderCardModalContent = () => {
    switch (modalContent) {
      case MODAL_CONTENT.BOARD_FORM:
        return <BoardForm />;
      case MODAL_CONTENT.TASK_DELETE:
        return <TaskDelete />;
      case MODAL_CONTENT.TASK_FORM_ADD:
        return <TaskForm />;
      case MODAL_CONTENT.TASK_FORM_EDIT:
        return <TaskForm editing={ true } />
      case MODAL_CONTENT.TASK_VIEW:
        return <TaskView />;
    }
  }

  const sidebarProps = {
    sidebarVisible,
    setSidebarVisible
  };

  useEffect(() => {
    applyPageOverflow(modalOpen);
  }, [ modalOpen ]);

  return (
    <>
      <Navbar { ...sidebarProps } />
      <div className="app__content-wrapper">
        <Sidebar { ...sidebarProps } />
        <BoardContent { ...sidebarProps } />
        { modalOpen && <CardModal>{ renderCardModalContent() }</CardModal> }
      </div>
    </>
  );
};
