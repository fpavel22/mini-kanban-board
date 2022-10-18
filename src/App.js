import { useSelector } from 'react-redux';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import cn from 'classnames';

import { themeSliceSelector } from './features/themeSlice';
import { userSelector } from './features/userSlice';
import { LandingPage, Login, Register } from './pages';
import { useAuthStateChange } from './hooks';

import './styles/App.scss';

function App() {
  const darkMode = useSelector(themeSliceSelector);
  const user = useSelector(userSelector);
  const { authIsReady } = useAuthStateChange();

  const _className = cn('app', {
    'app--dark': darkMode
  });

  return (
    <main className={ _className }>
      { authIsReady && (
        <BrowserRouter>
          <Routes>
            <Route path="/" element={ user ? <LandingPage /> : <Navigate to="/login" /> } />
            <Route path="/login" element={ user ? <Navigate to="/" /> : <Login /> } />
            <Route path="/register" element={ user ? <Navigate to="/" /> : <Register /> } />
          </Routes>
        </BrowserRouter>
      ) }
    </main>
  );
}

export default App;
