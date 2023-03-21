import { FC } from 'react';
import { NavLink, Link } from 'react-router-dom';

// Assets
import logo from '../../../assets/logo.svg';

// Styles
import './styles.scss';

const Navbar: FC = () => {
  return (
    <nav className='navbar'>
      <div className='navbar__container'>
        <Link to='/marvel'>
          <img src={logo} alt='logo' className='navbar__container-logo' />
        </Link>
        <ul className='navbar__container-list'>
          <li className='navbar__container-list-item'>
            <NavLink
              to='/marvel'
              className={({ isActive }) => {
                return isActive
                  ? 'navbar__container-list-item--activeLink'
                  : 'navbar__container-list-item--noActiveLink';
              }}
            >
              Marvel
            </NavLink>
          </li>
          <li className='navbar__container-list-item'>
            <NavLink
              to='/dc'
              className={({ isActive }) => {
                return isActive
                  ? 'navbar__container-list-item--activeLink'
                  : 'navbar__container-list-item--noActiveLink';
              }}
            >
              DC
            </NavLink>
          </li>
          <li className='navbar__container-list-item'>
            <NavLink
              to='/search'
              className={({ isActive }) => {
                return isActive
                  ? 'navbar__container-list-item--activeLink'
                  : 'navbar__container-list-item--noActiveLink';
              }}
            >
              Search
            </NavLink>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
