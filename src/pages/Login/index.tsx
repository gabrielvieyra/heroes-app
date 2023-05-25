import { FormEvent, FC, useState, useMemo, useContext } from 'react';

// Components
import { Button, Input, ButtonLink, Spinner, Error } from '../../components';

// Context
import { AuthContext } from '../../context/AuthContext';

// Custom hooks
import { useForm } from '../../hooks/useForm';

// Interfaces
import { LogUser, FormErrorMsgs } from '../../types/types';

// Styles
import './styles.scss';

type submitEvent = FormEvent<HTMLFormElement>;

const initialState: LogUser = {
  email: '',
  password: '',
};

export const Login: FC = () => {
  // Variable de estado donde almacenamos los errores
  const [errors, setErrors] = useState<FormErrorMsgs>({});
  const { formState, onInputChange } = useForm<LogUser>(initialState);
  const { user, onLoginWithCredentials, onGoogleSignIn, removeErrorMsg } = useContext(AuthContext);
  const isAuthenticating = useMemo(() => user.status === 'checking', [user.status]);

  // Cuando disparan el handleSubmit quiere decir que estan intentando autenticarse con email y password
  function handleSubmit(e: submitEvent): void {
    e.preventDefault();
    const errors: FormErrorMsgs = {};

    const pattern = new RegExp(
      /^(("[\w-\s]+")|([\w-]+(?:\.[\w-]+)*)|("[\w-\s]+")([\w-]+(?:\.[\w-]+)*))(@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$)|(@\[?((25[0-5]\.|2[0-4][0-9]\.|1[0-9]{2}\.|[0-9]{1,2}\.))((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\.){2}(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\]?$)/i
    );
    if (!pattern.test(formState.email)) {
      errors.email = 'Correo electrónico no válido';
    }

    if (formState.password.length < 6) {
      errors.password = 'La contraseña debe tener al menos 6 caracteres';
    }

    setErrors(errors);

    if (Object.keys(errors).length === 0) {
      onLoginWithCredentials(formState);
    } else {
      return;
    }
  }

  return (
    <div className='login'>
      <div className='login__container'>
        <h1>Ingresar</h1>
        {user.errorMsg && <Error>{user.errorMsg}</Error>}
        <form onSubmit={handleSubmit} className='login__container-form'>
          <Input
            placeholder='Email'
            name='email'
            type='email'
            value={formState.email}
            onChange={onInputChange}
            error={errors.email ? true : false}
            errorMsg={errors.email}
          />
          <Input
            placeholder='Contraseña'
            name='password'
            type='password'
            value={formState.password}
            onChange={onInputChange}
            error={errors.password ? true : false}
            errorMsg={errors.password}
          />
          <Button type='submit' disabled={isAuthenticating}>
            {user.status === 'checking' ? (
              <div className='login__container-form-spinner'>
                <Spinner />
              </div>
            ) : (
              'Ingresar'
            )}
          </Button>
          <Button type='button' disabled={isAuthenticating} onClick={onGoogleSignIn}>
            Ingresar con Google
          </Button>
          <p className='login__container-form-description'>
            ¿No tienes cuenta?
            <ButtonLink route='/register' onClick={removeErrorMsg}>
              Registrarse
            </ButtonLink>
          </p>
        </form>
      </div>
    </div>
  );
};
