import { FC, useContext } from 'react';

// Components
import { NavbarItem } from '../NavbarItem';

// Context
import { AuthContext } from '../../../context/AuthContext';

// Styles
import './styles.scss';

interface NavbarLink {
  label: string;
  route: string;
}

interface MenuMobileProps {
  onToggleNav: () => void;
}

export const MenuMobile: FC<MenuMobileProps> = ({ onToggleNav }) => {
  const links: Array<NavbarLink> = [
    {
      label: 'Equipo',
      route: '/',
    },
    {
      label: 'Buscar héroes',
      route: '/search',
    },
    {
      label: 'Cerrar sesión',
      route: '/login',
    },
  ];
  const { logOut } = useContext(AuthContext);

  return (
    <div className='menu-mobile'>
      <ul className='menu-mobile__list'>
        {links.map(({ label, route }, index) => {
          return (
            <NavbarItem
              label={label}
              route={route}
              key={index}
              onClick={() => {
                if (label === 'Cerrar sesión') {
                  logOut();
                } else {
                  onToggleNav();
                }
              }}
            />
          );
        })}
      </ul>
    </div>
  );
};
