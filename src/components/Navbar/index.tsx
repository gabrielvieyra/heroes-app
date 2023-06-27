import { FC, useState, useContext } from 'react';
import { Link } from 'react-router-dom';

// Components
import { NavbarItem } from './NavbarItem';
import { MenuMobile } from './MenuMobile';
import { Logo } from '../Logo';

// Context
import { AuthContext } from '../../context/AuthContext';

// FeatherIcons
import { LogOut, Menu, X } from 'react-feather';

// Styles
import './styles.scss';

interface NavbarLink {
  label: string;
  route: string;
}

const ICON_COLOR = '#04121d';

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
  const [menuMobileShow, setMenuMobileShow] = useState<boolean>(false);

  function onToggleNav(): void {
    setMenuMobileShow(!menuMobileShow);
  }

  return (
    <>
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
              <LogOut onClick={() => logOut()} color={ICON_COLOR} />
            </Link>
          </div>
          <div className='navbar__container-mobile'>
            <Link to='/'>
              <Logo />
            </Link>
            {menuMobileShow ? (
              <X color={ICON_COLOR} onClick={onToggleNav} />
            ) : (
              <Menu color={ICON_COLOR} onClick={onToggleNav} />
            )}
          </div>
        </div>
      </nav>
      {menuMobileShow && <MenuMobile onToggleNav={onToggleNav} />}
    </>
  );
};
