import { FC, useContext } from 'react';
import { Navigate, Outlet } from 'react-router-dom';

// Context
import { AuthContext } from '../context/AuthContext';

export const PrivateRoute: FC = () => {
  const { dataLogin } = useContext(AuthContext);

  if (dataLogin.status === 'not-authenticated') {
    return <Navigate to='/login' />;
  }

  // Si estoy autenticado significa que puedo mostrar las rutas privadas
  return <Outlet />;
};
