import cn from 'classnames';
import { useState } from 'react';
import { useSelector } from 'react-redux';

import { themeSliceSelector } from './features/themeSlice';
import { showAddTaskSelector } from './features/showAddTaskModalSlice';

import { Navbar } from './components/navbar';
import { Sidebar } from './components/sidebar';
import { BoardContent } from './components/board-content';
import { CardModal } from './components/card-modal';
import { TaskForm } from './components/task-form';

import './styles/App.scss';

function App() {
  const [ sidebarVisible, setSidebarVisible ] = useState(true);

  const darkMode = useSelector(themeSliceSelector);
  const showModal = useSelector(showAddTaskSelector);

  const _className = cn('app', {
    'app--dark': darkMode
  });

  return (
    <main className={ _className }>
      <Navbar sidebarVisible={ sidebarVisible } />
      <Sidebar sidebarVisible={ sidebarVisible } setSidebarVisible={ setSidebarVisible } />
      <BoardContent />
      { showModal && (
        <CardModal>
          <TaskForm />
        </CardModal>
      ) }
    </main>
  );
}

export default App;
