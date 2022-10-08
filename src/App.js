import cn from 'classnames';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { useSelector } from 'react-redux';

import { Navbar } from './components/navbar';
import { themeSliceSelector } from './features/themeSlice';
import './styles/App.scss';

function App() {
  const darkMode = useSelector(themeSliceSelector);

  const _className = cn('app', {
    'app--dark': darkMode
  });

  return (
    <main className={ _className }>
      <Navbar />
    </main>
  );
}

export default App;
