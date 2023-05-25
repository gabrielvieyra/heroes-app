import { FC } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import Cookies from 'js-cookie';

export const PublicRoute: FC = () => {
  const token = Cookies.get('token');
  if (token) return <Navigate to='/' />;

  // En el caso de no estar autenticado voy a mostrar las rutas publicas
  return <Outlet />;
};
