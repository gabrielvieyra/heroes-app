import { useEffect, useContext } from 'react';
import { Routes, Route, Navigate, useNavigate } from 'react-router-dom';

// Pages
import { Marvel, Dc, Hero, Search, Login, Register } from '../pages/index';

// Context
import { AuthContext } from '../context/AuthContext';

// Firebase
import { onAuthStateChanged } from 'firebase/auth';
import { FirebaseAuth } from '../firebase/config';

export const AppRouter = () => {
  const navigate = useNavigate();
  const { dataLogin, handleLogout, handleLogin } = useContext(AuthContext);

  useEffect(() => {
    checkAuth();
  }, []);

  function checkAuth(): void {
    // Revisamos si la persona esta autenticada o no
    // onAuthStateChanged, cuando el estado de la autenticacion cambia este metodo se va a disparar
    onAuthStateChanged(FirebaseAuth, async user => {
      if (!user) return handleLogout('');

      const { uid, email, displayName, photoURL } = user;
      handleLogin(uid, displayName!, email!, photoURL!);
      navigate('/marvel');
    });
  }

  // Evaluamos el status y si es checking mostramos un loading
  if (dataLogin.status === 'checking') {
    return <h2>Checking credentials, wait a moment...</h2>;
  }

  return (
    // Si estoy autenticado significa que puedo mostrar las rutas privadas
    // En el caso de no estar autenticado voy a mostrar las rutas publicas
    <Routes>
      {dataLogin.status === 'authenticated' ? (
        // Protected Routes
        <>
          <Route path='/marvel' element={<Marvel />} />
          <Route path='/dc' element={<Dc />} />

          <Route path='/search' element={<Search />} />
          <Route path='/hero/:id' element={<Hero />} />
        </>
      ) : (
        // Public Routes
        <>
          <Route path='/login' element={<Login />} />
          <Route path='/register' element={<Register />} />
        </>
      )}

      <Route path='/*' element={<Navigate to='/login' />} />
    </Routes>
  );
};
