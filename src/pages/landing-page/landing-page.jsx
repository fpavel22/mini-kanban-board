import { useSelector } from "react-redux";

import { showModalSelector } from '../../features/showModalSlice';
import {
  Sidebar,
  BoardContent,
  CardModal,
  TaskForm,
  TaskView,
  TaskDelete
} from '../../components';

export const LandingPage = ({ sidebarVisible, setSidebarVisible }) => {
  const { taskForm: { addNewTask, editTask }, taskView, taskDelete } = useSelector(showModalSelector);

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

  return (
    <div className="app__content-wrapper">
      <Sidebar sidebarVisible={ sidebarVisible } setSidebarVisible={ setSidebarVisible } />
      <BoardContent />
      { showCardModal() }
    </div>
  );
};
