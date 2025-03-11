import cn from 'classnames';
import { useSelector } from 'react-redux';
import { Route, Routes as RouterRoutes } from 'react-router-dom';

import { PATHS } from '@/constants';
import { themeSliceSelector } from '@/features/themeSlice';
import {
  Home,
  Login,
  PasswordReset,
  Register
} from '@/pages';

import { PageNotFound } from './page-not-found';
import { ProtectedRoute } from './protected-route';
import { PublicRoute } from './public-route';

export const Routes = () => {
  const darkMode = useSelector(themeSliceSelector);

  const className = cn('app', {
    'app--dark': darkMode
  });

  return (
    <main className={ className }>
      <RouterRoutes>
        <Route
          element={(
            <ProtectedRoute>
              <Home />
            </ProtectedRoute>
          )}
          path={ PATHS.ROOT }
        />
        <Route
          element={(
            <ProtectedRoute>
              <Home />
            </ProtectedRoute>
          )}
          path={ `${ PATHS.BOARDS }/:boardId` }
        />
        <Route
          element={(
            <PublicRoute>
              <Login />
            </PublicRoute>
          )}
          path={ PATHS.LOGIN }
        />
        <Route
          element={(
            <PublicRoute>
              <Register />
            </PublicRoute>
          )}
          path={ PATHS.REGISTER }
        />
        <Route
          element={(
            <PublicRoute>
              <PasswordReset />
            </PublicRoute>
          )}
          path={ PATHS.RESET }
        />
        <Route element={ <PageNotFound /> } path="*" />
      </RouterRoutes>
    </main>
  );
};
