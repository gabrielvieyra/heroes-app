import { useEffect, useContext } from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';

// Pages
import { Marvel, Dc, Hero, Search, Login, Register, NotFound } from '../pages/index';

// Components
import { PrivateRoute } from './PrivateRoute';
import { PublicRoute } from './PublicRoute';

// Context
import { AuthContext } from '../context/AuthContext';

// Firebase
import { onAuthStateChanged } from 'firebase/auth';
import { FirebaseAuth } from '../firebase/config';

export const AppRouter = () => {
  const navigate = useNavigate();
  const { dataLogin, handleLogout, handleLogin } = useContext(AuthContext);

  useEffect(() => {
    // checkAuth();
  }, []);

  function checkAuth(): void {
    // Revisamos si la persona esta autenticada o no
    // onAuthStateChanged, cuando el estado de la autenticacion cambia este metodo se va a disparar
    onAuthStateChanged(FirebaseAuth, async user => {
      if (!user) return handleLogout('');

      const { uid, email, displayName, photoURL } = user;
      handleLogin(uid, displayName!, email!, photoURL!);
      navigate('/');
    });
  }

  // Evaluamos el status y si es checking mostramos un loading
  if (dataLogin.status === 'checking') {
    return <h2>Checking credentials, wait a moment...</h2>;
  }

  return (
    <Routes>
      {/* Marvel y el resto de las paginas son elementos hijos de PrivateRoute, entonces primero tiene que pasar por el componente PrivateRoute */}
      {/* Cuando tenemos componentes que tienen el mismo nivel de autorizacion ej en este caso cuando un usuario se autentica tiene acceso a todo */}
      <Route element={<PrivateRoute />}>
        <Route path='/' element={<Marvel />} />
        <Route path='/dc' element={<Dc />} />
        <Route path='/search' element={<Search />} />
        <Route path='/hero/:id' element={<Hero />} />
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
