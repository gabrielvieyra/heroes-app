// Components
import { Navbar } from './components/index';

// Routes
import { AppRouter } from './router/AppRouter';

// Styles
import './App.scss';

function App() {
  return (
    <>
      <Navbar />
      <AppRouter />
    </>
  );
}

export default App;
