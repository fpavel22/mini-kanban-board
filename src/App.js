import { useState } from 'react';
import { useSelector } from 'react-redux';
import cn from 'classnames';

import { themeSliceSelector } from './features/themeSlice';
import { showModalSelector } from './features/showModalSlice';

import {
  Navbar,
  Sidebar,
  BoardContent,
  CardModal,
  TaskForm,
  TaskView,
  TaskDelete
} from './components';

import './styles/App.scss';

function App() {
  const [ sidebarVisible, setSidebarVisible ] = useState(true);

  const darkMode = useSelector(themeSliceSelector);
  const { taskForm: { addNewTask, editTask }, taskView, taskDelete } = useSelector(showModalSelector);

  const _className = cn('app', {
    'app--dark': darkMode
  });

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

  const sectionProps = {
    sidebarVisible,
    setSidebarVisible
  };

  return (
    <main className={ _className }>
      <Navbar { ...sectionProps } />
      <div className="app__content-wrapper">
        <Sidebar { ...sectionProps } />
        <BoardContent />
      </div>
      { showCardModal() }
    </main>
  );
}

export default App;
