import { FC } from 'react';
import { NavLink } from 'react-router-dom';

// Styles
import './styles.scss';

interface NavbarItemProps {
  label: string;
  route: string;
}

const NavbarItem: FC<NavbarItemProps> = ({ label, route }) => {
  return (
    <li className='navbar-item'>
      <NavLink
        to={route}
        className={({ isActive }) => {
          return isActive ? 'navbar-item--activeLink' : 'navbar-item--noActiveLink';
        }}
      >
        {label}
      </NavLink>
    </li>
  );
};

export default NavbarItem;
