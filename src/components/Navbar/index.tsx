import { FC, useContext } from 'react';
import { Link } from 'react-router-dom';

// Components
import { NavbarItem } from './NavbarItem';
import { Logo } from '../Logo';

// Context
import { AuthContext } from '../../context/AuthContext';

// FeatherIcons
import { LogOut } from 'react-feather';

// Styles
import './styles.scss';

interface NavbarLink {
  label: string;
  route: string;
}

const LOGOUT_COLOR = '#04121d';

export const Navbar: FC = () => {
  const links: Array<NavbarLink> = [
    {
      label: 'Equipo',
      route: '/',
    },
    {
      label: 'Buscar héroes',
      route: '/search',
    },
  ];
  const { user, logOut } = useContext(AuthContext);

  return (
    <nav className='navbar'>
      <div className='navbar__container'>
        <div className='navbar__container-wrapper'>
          <Link to='/'>
            <Logo />
          </Link>
          <ul className='navbar__container-wrapper-list'>
            {links.map(({ label, route }, index) => {
              return <NavbarItem label={label} route={route} key={index} />;
            })}
          </ul>
        </div>

        <div className='navbar__container-box'>
          <span>{user.displayName}</span>
          <Link to='/login'>
            <LogOut onClick={() => logOut()} color={LOGOUT_COLOR} />
          </Link>
        </div>
      </div>
    </nav>
  );
};
