import { useState } from 'react';
import { useSelector } from 'react-redux';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import cn from 'classnames';

import { themeSliceSelector } from './features/themeSlice';
import { LandingPage, Login, Register } from './pages';
import { Navbar } from './components';

import './styles/App.scss';

function App() {
  const [ sidebarVisible, setSidebarVisible ] = useState(true);

  const darkMode = useSelector(themeSliceSelector);

  const _className = cn('app', {
    'app--dark': darkMode
  });

  const sidebarProps = {
    sidebarVisible,
    setSidebarVisible
  };

  return (
    <main className={ _className }>
      <BrowserRouter>
      <Navbar { ...sidebarProps } />
      <Routes>
        <Route path="/" element={ <LandingPage { ...sidebarProps } /> } />
        <Route path="/login" element={ <Login /> } />
        <Route path="/register" element={ <Register /> } />
      </Routes>
      </BrowserRouter>
    </main>
  );
}

export default App;
