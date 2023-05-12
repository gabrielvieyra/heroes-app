import { FC, ReactNode, useContext } from 'react';

// Components
import { Navbar, Footer } from '../index';

// Context
import { AuthContext } from '../../context/AuthContext';

// Styles
import './styles.scss';

interface LayoutProps {
  children: ReactNode;
}

export const Layout: FC<LayoutProps> = ({ children }) => {
  const { dataLogin } = useContext(AuthContext);

  return (
    <div className='layout'>
      {dataLogin.status === 'authenticated' && <Navbar />}
      <main className='layout__children'>{children}</main>
      {dataLogin.status === 'authenticated' && <Footer />}
    </div>
  );
};
