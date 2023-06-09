import { FC } from 'react';
import { NavLink } from 'react-router-dom';

// Styles
import './styles.scss';

interface NavbarItemProps {
  label: string;
  route: string;
  onClick?: () => void;
}

export const NavbarItem: FC<NavbarItemProps> = ({ label, route, onClick }) => {
  return (
    <li className='navbar-item'>
      <NavLink
        to={route}
        className={({ isActive }) => {
          return isActive ? 'navbar-item--activeLink' : 'navbar-item--noActiveLink';
        }}
        onClick={onClick}
      >
        {label}
      </NavLink>
    </li>
  );
};
