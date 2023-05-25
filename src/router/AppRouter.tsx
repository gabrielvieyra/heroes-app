import { useEffect, useContext } from 'react';
import { Routes, Route } from 'react-router-dom';
import Cookies from 'js-cookie';

// Pages
import { Home, HeroDetail, Search, Login, Register, NotFound } from '../pages/index';

// Components
import { PrivateRoute } from './PrivateRoute';
import { PublicRoute } from './PublicRoute';

// Context
import { AuthContext } from '../context/AuthContext';

export const AppRouter = () => {
  const { authUser } = useContext(AuthContext);

  useEffect(() => {
    const token = Cookies.get('token');
    if (token) authUser();
  }, []);

  return (
    <Routes>
      {/* Marvel y el resto de las paginas son elementos hijos de PrivateRoute, entonces primero tiene que pasar por el componente PrivateRoute */}
      {/* Cuando tenemos componentes que tienen el mismo nivel de autorizacion ej en este caso cuando un usuario se autentica tiene acceso a todo */}
      <Route element={<PrivateRoute />}>
        {/* Con la barra vacia lo que hacemos es que cuando el usuario no escriba nada vaya al element que definimos por defecto */}
        <Route path='/' element={<Home />} />
        <Route path='/search' element={<Search />} />
        <Route path='/hero/:id' element={<HeroDetail />} />
      </Route>

      <Route element={<PublicRoute />}>
        <Route path='/login' element={<Login />} />
        <Route path='/register' element={<Register />} />
      </Route>

      {/* Con el asterisco lo que hacemos es que el element que cargamos se va a mostrar cuando la ruta que quiere el usuario no existe */}
      <Route path='*' element={<NotFound />} />
    </Routes>
  );
};
