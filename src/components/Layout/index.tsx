import { FC, ReactNode } from 'react';

// Components
import { Navbar, Footer } from '../index';

// React Toastify
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// Styles
import './styles.scss';

interface LayoutProps {
  children: ReactNode;
}

export const Layout: FC<LayoutProps> = ({ children }) => {
  return (
    <div className='layout'>
      <Navbar />
      <main className='layout__children'>{children}</main>
      <Footer />
      <ToastContainer />
    </div>
  );
};
