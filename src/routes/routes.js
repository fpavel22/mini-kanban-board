import { Navigate } from 'react-router-dom';
import {
  LandingPage,
  Login,
  Register,
  PasswordReset
} from '../pages';

export const routes = [
  {
    path: '/',
    element: <LandingPage />,
    redirect: <Navigate to="/login" />
  },
  {
    path: '/boards/:boardId',
    element: <LandingPage />,
    redirect: <Navigate to="/login" />
  },
  {
    path: 'login',
    element: <Navigate to="/" />,
    redirect: <Login />
  },
  {
    path: 'register',
    element: <Navigate to="/" />,
    redirect: <Register />
  },
  {
    path: 'password-reset',
    element: <Navigate to="/" />,
    redirect: <PasswordReset />
  }
];
