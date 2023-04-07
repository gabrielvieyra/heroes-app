import { useContext } from 'react';

// Components
import { Navbar } from './components';

// Routes
import { AppRouter } from './router/AppRouter';

// Context
import { AuthContext } from './context/AuthContext';

// Styles
import './App.scss';

function App() {
  const { dataLogin } = useContext(AuthContext);

  return (
    <>
      {dataLogin.status === 'authenticated' && <Navbar />}
      <AppRouter />
    </>
  );
}

export default App;
