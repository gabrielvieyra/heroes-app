import { FC, useMemo, useContext } from 'react';
import { Link } from 'react-router-dom';

// Context
import { AuthContext } from '../../context/AuthContext';

// Custom hooks
import { useForm } from '../../hooks/useForm';

// Styles
import './styles.scss';

type eventSubmit = React.FormEvent<HTMLFormElement>;

const Login: FC = () => {
  const { formState, onInputChange } = useForm({
    email: '',
    password: '',
  });
  const { dataLogin, onLoginWithCredentials, onGoogleSignIn } = useContext(AuthContext);
  const isAuthenticating = useMemo(() => dataLogin.status === 'checking', [dataLogin.status]);

  // Cuando disparan el handleSubmit quiere decir que estan intentando autenticarse con email y password
  function handleSubmit(e: eventSubmit): void {
    e.preventDefault();

    const { email, password } = formState;
    onLoginWithCredentials(email!, password!);
  }

  return (
    <div className='login'>
      <h2>Login</h2>
      {dataLogin.errorMessages!.length > 0 && (
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          {dataLogin.errorMessages!.map((msg, key) => {
            return (
              <span key={key} style={{ color: 'red' }}>
                {msg}
              </span>
            );
          })}
        </div>
      )}
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
