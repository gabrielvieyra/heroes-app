import { FC, useState, useEffect, useContext } from 'react';
import { NavLink, Link, useNavigate } from 'react-router-dom';

// Context
import { AuthContext } from '../../context/AuthContext';

// Assets
import logo from '../../../assets/logo.svg';

// Styles
import './styles.scss';

const Navbar: FC = () => {
  const navigate = useNavigate();
  const { dataLogin, setDataLogin } = useContext(AuthContext);
  const [name, setName] = useState<string>('');

  useEffect(() => {
    const name = localStorage.getItem('name') || '';
    setName(name);
  }, [dataLogin]);

  function onLogout(): void {
    handleDataLogin();
    removeLocalStorage();
    navigate('/login');
  }

  function handleDataLogin(): void {
    setDataLogin({
      logged: false,
      name: '',
    });
  }

  function removeLocalStorage(): void {
    localStorage.removeItem('name');
    localStorage.removeItem('isLogged');
  }

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
        {name && (
          <div>
            <span>{name}</span>
            <button style={{ backgroundColor: 'lightcoral' }} onClick={onLogout}>
              Logout
            </button>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
