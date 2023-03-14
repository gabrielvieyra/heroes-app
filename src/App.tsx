import { Routes, Route, Navigate } from 'react-router-dom';

// Components
import { Navbar } from './components/index';

// Pages
import { Marvel, Dc, Hero } from './pages/index';

// Styles
import './App.scss';

function App() {
  return (
    <>
      <Navbar />

      <Routes>
        <Route path='/marvel' element={<Marvel />} />
        <Route path='/dc' element={<Dc />} />

        <Route path='/hero' element={<Hero />} />

        <Route path='/' element={<Navigate to='/marvel' />} />
      </Routes>
    </>
  );
}

export default App;
