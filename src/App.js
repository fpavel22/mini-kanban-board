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
  TaskView
} from './components';

import './styles/App.scss';

function App() {
  const [ sidebarVisible, setSidebarVisible ] = useState(true);

  const darkMode = useSelector(themeSliceSelector);
  const { showAddTaskModal, showTaskDetailsModal } = useSelector(showModalSelector);

  const _className = cn('app', {
    'app--dark': darkMode
  });

  const renderCardModalContent = () => (
    showAddTaskModal
      ? <TaskForm />
      : showTaskDetailsModal
        ? <TaskView />
        : null
  );

  const showCardModal = () => (
    (showAddTaskModal || showTaskDetailsModal) && <CardModal>{ renderCardModalContent() }</CardModal>
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
