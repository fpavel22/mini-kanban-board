import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';

import { Home } from '@/pages';
import { userSelector } from '@/features/userSlice';
import { PATHS } from '@/constants';

export const ProtectedRoute = ({ children }) => {
  const isAuthenticated = useSelector(userSelector);

  if (!isAuthenticated) {
    const { LOGIN } = PATHS;

    return <Navigate to={ LOGIN } />;
  }

  return children;
};

export const protectedRoutes = [
  {
    path: PATHS.ROOT,
    element: (
      <ProtectedRoute>
        <Home />
      </ProtectedRoute>
    ),
  },
  {
    path: `${ PATHS.BOARDS }/:boardId`,
    element: (
      <ProtectedRoute>
        <Home />
      </ProtectedRoute>
    ),
  },
];
