import { useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import cn from 'classnames';

import { routes } from './routes';
import { fetchUserBoards, resetUserBoards } from './features/boardsSlice';
import { themeSliceSelector, enableDarkTheme, enableLightTheme } from './features/themeSlice';
import { userSelector } from './features/userSlice';
import { useAuthStateChange, useConsumeContext } from './hooks';
import { loadFromLocalStorage } from './utils/utils';

function App() {
  const darkMode = useSelector(themeSliceSelector);
  const user = useSelector(userSelector);
  const { setSidebarVisible } = useConsumeContext();

  const dispatch = useDispatch();
  const { authIsReady } = useAuthStateChange();

  const _className = cn('app', {
    'app--dark': darkMode
  });

  useEffect(() => {
    dispatch(resetUserBoards());
  }, []);

  useEffect(() => {
    dispatch(fetchUserBoards(user?.uid));
    const localPreferences = loadFromLocalStorage(user?.uid);

    if (localPreferences) {
      const { userId, darkMode, sidebarVisible } = localPreferences;

      if (userId === user.uid) {
        dispatch(darkMode ? enableDarkTheme() : enableLightTheme());
        setSidebarVisible(sidebarVisible);
      }
    }
  }, [ user ]);

  return (
    <main className={ _className }>
      { authIsReady && (
        <BrowserRouter>
          <Routes>
            { routes.map(({ path, element, redirect }) => (
              <Route key={ path }
                  path={ path }
                  element={ path === '*' ? element : user ? element : redirect } />
            )) }
          </Routes>
        </BrowserRouter>
      ) }
    </main>
  );
}

export default App;
