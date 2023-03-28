import { FC, useMemo, useContext } from 'react';
import { Link } from 'react-router-dom';

// Context
import { AuthContext } from '../../context/AuthContext';

// Custom hooks
import { useForm } from '../../hooks/useForm';

// Firebase
import { singInWithGoogle } from '../../firebase/providers';

// Styles
import './styles.scss';

type eventSubmit = React.FormEvent<HTMLFormElement>;

const Login: FC = () => {
  const { formState, onInputChange } = useForm({
    email: 'test@gmail.com',
    password: 'test',
  });
  const { dataLogin, setDataLogin, onLoginWithCredentials, handleLogin, handleLogout } =
    useContext(AuthContext);
  const isAuthenticating = useMemo(() => dataLogin.status === 'checking', [dataLogin.status]);

  // Cuando disparan el handleSubmit quiere decir que estan intentando autenticarse con email y password
  function handleSubmit(e: eventSubmit): void {
    e.preventDefault();
    const { email, password } = formState;
    onLoginWithCredentials(email, password);
  }

  function checkingCredentials(): void {
    setDataLogin({ ...dataLogin, status: 'checking' });
  }

  // Cuando disparan el onGoogleSignIn quiere decir que estan intentando autenticarse con google
  // Autentico al usuario o muestro un error
  async function onGoogleSignIn(): Promise<void> {
    checkingCredentials();

    const result = await singInWithGoogle();
    // Si la autenticacion sale mal reseteamos todo
    if (!result.ok) {
      const { errorMessage } = result;
      handleLogout(errorMessage);
      return;
    }

    // Si todo sale bien
    const { uid, displayName, email, photoURL } = result;
    handleLogin(uid, displayName, email, photoURL);
  }

  return (
    <div className='login'>
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <input
          name='email'
          type='email'
          placeholder='E-mail'
          value={formState.email}
          onChange={onInputChange}
        />
        <input
          name='password'
          type='password'
          placeholder='Password'
          value={formState.password}
          onChange={onInputChange}
        />

        <div>
          <button
            type='submit'
            style={{ backgroundColor: 'lightcoral' }}
            disabled={isAuthenticating}
          >
            Log In
          </button>
          <button
            type='button'
            style={{ backgroundColor: 'lightblue' }}
            onClick={onGoogleSignIn}
            disabled={isAuthenticating}
          >
            Google
          </button>

          <Link to='/register'>
            <span>Crear una cuenta</span>
          </Link>
        </div>
      </form>
    </div>
  );
};

export default Login;
