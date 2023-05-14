import { FC, useContext } from 'react';
import { Link } from 'react-router-dom';

// Components
import NavbarItem from '../Navbar/NavbarItem/index';
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

const LOGOUT_COLOR: string = '#04121d';

const Navbar: FC = () => {
  const links: Array<NavbarLink> = [
    {
      label: 'Marvel',
      route: '/marvel',
    },
    {
      label: 'DC',
      route: '/dc',
    },
    {
      label: 'Search',
      route: '/search',
    },
  ];
  const { dataLogin, handleLogout } = useContext(AuthContext);

  function onLogout(): void {
    handleLogout('');
  }

  return (
    <nav className='navbar'>
      <div className='navbar__container'>
        <div className='navbar__container-wrapper'>
          <Link to='/marvel'>
            <Logo />
          </Link>
          <ul className='navbar__container-wrapper-list'>
            {links.map(({ label, route }, index) => {
              return <NavbarItem label={label} route={route} key={index} />;
            })}
          </ul>
        </div>

        <div className='navbar__container-box'>
          <span>{dataLogin.displayName}</span>
          <Link to='/login'>
            <LogOut onClick={onLogout} color={LOGOUT_COLOR} />
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
