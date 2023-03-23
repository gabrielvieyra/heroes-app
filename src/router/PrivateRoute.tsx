import { FC } from 'react';
import { Navigate, useLocation } from 'react-router-dom';

interface PrivateRouteProps {
  children: JSX.Element;
}

export const PrivateRoute: FC<PrivateRouteProps> = ({ children }) => {
  const { pathname, search } = useLocation();
  const lastPath = pathname + search;
  localStorage.setItem('lastPath', lastPath);
  const isLogged = localStorage.getItem('isLogged') || false;

  return isLogged ? children : <Navigate to='/login' />;
};
