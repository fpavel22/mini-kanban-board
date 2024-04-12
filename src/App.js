import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { useSelector } from 'react-redux';
import cn from 'classnames';

import { themeSliceSelector } from '@/features/themeSlice';
import { publicRoutes, protectedRoutes } from '@/routes';
import { PageNotFound } from '@/pages';
import { useAuthStateChange } from '@/hooks';

const App = () => {
  const { authIsReady } = useAuthStateChange();

  const darkMode = useSelector(themeSliceSelector);

  const routes = [ ...protectedRoutes, ...publicRoutes ];

  const className = cn('app', {
    'app--dark': darkMode
  });

  return (
    <main className={ className }>
      { authIsReady && (
        <BrowserRouter>
          <Routes>
            { routes.map(({ path, element }) => (
              <Route
                key={ path }
                path={ path }
                element={ element }
              />
            )) }
            <Route path="*" element={ <PageNotFound /> } />
          </Routes>
        </BrowserRouter>
      ) }
    </main>
  );
};

export default App;
