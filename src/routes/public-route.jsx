import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';

import { Login, Register, PasswordReset } from '@/pages';
import { userSelector } from '@/features/userSlice';
import { PATHS } from '@/constants';

export const PublicRoute = ({ children }) => {
  const isAuthenticated = useSelector(userSelector);

  if (isAuthenticated) {
    const { ROOT } = PATHS;

    return <Navigate to={ ROOT } />;
  }

  return children;
};

export const publicRoutes = [
  {
    path: PATHS.LOGIN,
    element: (
      <PublicRoute>
        <Login />
      </PublicRoute>
    ),
  },
  {
    path: PATHS.REGISTER,
    element: (
      <PublicRoute>
        <Register />
      </PublicRoute>
    ),
  },
  {
    path: PATHS.RESET,
    element: (
      <PublicRoute>
        <PasswordReset />
      </PublicRoute>
    ),
  },
];
