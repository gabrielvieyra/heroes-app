import { Routes, Route, Navigate } from 'react-router-dom';

// Components
import { Navbar } from './components/index';

// Pages
import { Marvel, Dc, Hero, Search } from './pages/index';

// Styles
import './App.scss';

function App() {
  return (
    <>
      <Navbar />

      <Routes>
        <Route path='/marvel' element={<Marvel />} />
        <Route path='/dc' element={<Dc />} />

        <Route path='/search' element={<Search />} />
        <Route path='/hero/:id' element={<Hero />} />

        <Route path='/' element={<Navigate to='/marvel' />} />
      </Routes>
    </>
  );
}

export default App;
