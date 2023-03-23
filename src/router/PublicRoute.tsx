import { FC } from 'react';
import { Navigate } from 'react-router-dom';

interface PublicRouteProps {
  children: JSX.Element;
}

export const PublicRoute: FC<PublicRouteProps> = ({ children }) => {
  const isLogged = localStorage.getItem('isLogged') || false;
  const lastPath = localStorage.getItem('lastPath') || '/marvel';

  return !isLogged ? children : <Navigate to={lastPath} />;
};
