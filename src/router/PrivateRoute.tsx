import { FC } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import Cookies from 'js-cookie';

// Components
import { Layout } from '../components';

export const PrivateRoute: FC = () => {
  const token = Cookies.get('token');
  if (!token) return <Navigate to='/login' />;

  // Si estoy autenticado significa que puedo mostrar las rutas privadas
  return (
    <Layout>
      <Outlet />
    </Layout>
  );
};
