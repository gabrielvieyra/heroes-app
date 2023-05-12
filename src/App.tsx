// Components
import { Layout } from './components';

// Routes
import { AppRouter } from './router/AppRouter';

// Styles
import './App.scss';

function App() {
  return (
    <Layout>
      <AppRouter />
    </Layout>
  );
}

export default App;
