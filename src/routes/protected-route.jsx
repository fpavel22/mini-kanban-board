import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';

import { PATHS } from '@/constants';
import { userSelector } from '@/features/userSlice';

export const ProtectedRoute = ({ children }) => {
  const isAuthenticated = useSelector(userSelector);

  if (!isAuthenticated) {
    return <Navigate to={ PATHS.LOGIN } />;
  }

  return children;
};
