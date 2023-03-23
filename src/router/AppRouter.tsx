import { Routes, Route, Navigate } from 'react-router-dom';

// Pages
import { Marvel, Dc, Hero, Search, Login } from '../pages/index';

// Routes
import { PrivateRoute } from './PrivateRoute';
import { PublicRoute } from './PublicRoute';

export const AppRouter = () => {
  return (
    <Routes>
      {/* Public Routes */}
      <Route
        path='/login'
        element={
          <PublicRoute>
            <Login />
          </PublicRoute>
        }
      ></Route>

      {/* Protected Routes */}
      <Route
        path='/*'
        element={
          <PrivateRoute>
            <Routes>
              <Route path='/marvel' element={<Marvel />} />
              <Route path='/dc' element={<Dc />} />

              <Route path='/search' element={<Search />} />
              <Route path='/hero/:id' element={<Hero />} />
            </Routes>
          </PrivateRoute>
        }
      ></Route>

      <Route path='/' element={<Navigate to='/marvel' />} />
    </Routes>
  );
};
