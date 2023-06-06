import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { BrowserRouter } from 'react-router-dom';

// Provider
import { AuthProvider } from './context/AuthContext';
import { HeroesProvider } from './context/HeroesContext';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <AuthProvider>
      <HeroesProvider>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </HeroesProvider>
    </AuthProvider>
  </React.StrictMode>
);
