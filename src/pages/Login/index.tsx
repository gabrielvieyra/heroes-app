import { FC, useContext } from 'react';
import { useNavigate } from 'react-router-dom';

// Context
import { AuthContext } from '../../context/AuthContext';

// Styles
import './styles.scss';

const Login: FC = () => {
  const navigate = useNavigate();
  const { setDataLogin } = useContext(AuthContext);

  function onLogin(): void {
    handleDataLogin();
    setLocalStorage('true', 'Gabriel Vieyra');
    const lastPath = localStorage.getItem('lastPath') || '/';
    navigate(lastPath);
  }

  function handleDataLogin(): void {
    setDataLogin({
      logged: true,
      name: 'Gabriel Vieyra',
    });
  }

  function setLocalStorage(isLogged: string, name: string): void {
    localStorage.setItem('isLogged', isLogged);
    localStorage.setItem('name', name);
  }

  return (
    <div className='login'>
      <h2>Login</h2>
      <button style={{ backgroundColor: 'lightcoral' }} onClick={onLogin}>
        Login
      </button>
    </div>
  );
};

export default Login;
