import { useEffect } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import cn from 'classnames';

import { LandingPage, Login, Register, PageNotFound, PasswordReset } from './pages';
import { fetchUserBoards } from './features/boardsSlice';
import { themeSliceSelector } from './features/themeSlice';
import { userSelector } from './features/userSlice';
import { useAuthStateChange } from './hooks';
import { fetchTasks } from './features/tasksSlice';

function App() {
  const darkMode = useSelector(themeSliceSelector);
  const user = useSelector(userSelector);

  const dispatch = useDispatch();
  const { authIsReady } = useAuthStateChange();

  const _className = cn('app', {
    'app--dark': darkMode
  });

  useEffect(() => {
    dispatch(fetchUserBoards(null));
  }, []);

  useEffect(() => {
    dispatch(fetchUserBoards(user?.uid));
  }, [ user ]);

  return (
    <main className={ _className }>
      { authIsReady && (
        <BrowserRouter>
          <Routes>
            <Route path="/" element={ user ? <LandingPage /> : <Navigate to="/login" /> } />
            <Route path="/boards/:boardId" element={ user ? <LandingPage /> : <Navigate to="/login" /> } />
            <Route path="login" element={ user ? <Navigate to="/" /> : <Login /> } />
            <Route path="register" element={ user ? <Navigate to="/" /> : <Register /> } />
            <Route path="password-reset" element={ user ? <Navigate to="/" /> : <PasswordReset /> } />
            <Route path="*" element={ <PageNotFound /> } />
          </Routes>
        </BrowserRouter>
      ) }
    </main>
  );
}

export default App;
