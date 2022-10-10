import cn from 'classnames';
import { useState } from 'react';
import { useSelector } from 'react-redux';

import { Navbar } from './components/navbar';
import { Sidebar } from './components/sidebar';
import { BoardContent } from './components/board-content';
import { themeSliceSelector } from './features/themeSlice';
import './styles/App.scss';

function App() {
  const [ sidebarVisible, setSidebarVisible ] = useState(true);
  const darkMode = useSelector(themeSliceSelector);

  const _className = cn('app', {
    'app--dark': darkMode
  });

  return (
    <main className={ _className }>
      <Navbar sidebarVisible={ sidebarVisible } />
      <Sidebar sidebarVisible={ sidebarVisible } setSidebarVisible={ setSidebarVisible } />
      <BoardContent />
    </main>
  );
}

export default App;
