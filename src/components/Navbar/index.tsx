import { FC } from 'react';
import { NavLink } from 'react-router-dom';

// Assets
import logo from '../../assets/logo.svg';

// Styles
import './styles.scss';

const Navbar: FC = () => {
  return (
    <nav className='navbar'>
      <img src={logo} alt='logo' className='navbar__logo' />
      <ul className='navbar__list'>
        <li className='navbar__list-item'>
          <NavLink
            to='/marvel'
            className={({ isActive }) => {
              return isActive ? 'navbar__list-item--activeLink' : 'navbar__list-item--noActiveLink';
            }}
          >
            Marvel
          </NavLink>
        </li>
        <li className='navbar__list-item'>
          <NavLink
            to='/dc'
            className={({ isActive }) => {
              return isActive ? 'navbar__list-item--activeLink' : 'navbar__list-item--noActiveLink';
            }}
          >
            DC
          </NavLink>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
