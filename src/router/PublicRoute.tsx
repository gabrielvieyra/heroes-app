import { FC, useContext } from 'react';
import { Navigate, Outlet } from 'react-router-dom';

// Context
import { AuthContext } from '../context/AuthContext';

export const PublicRoute: FC = () => {
  const { dataLogin } = useContext(AuthContext);

  if (dataLogin.status === 'authenticated') {
    return <Navigate to='/' />;
  }

  // En el caso de no estar autenticado voy a mostrar las rutas publicas
  return <Outlet />;
};
